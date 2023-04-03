import React from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import prisma from "../../../../utils/prismadb";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import {
  IconButton,
  ImageContainer,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../../../components/elements";

const BrandsHome = ({ brands }) => {
  const storeSlug = useRouter().query.storeSlug;
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [filteredBrands, setFilteredBrands] = React.useState(brands);

  console.log(brands);

  async function deleteBrand(slug) {
    setIsDeleting(true);
    setSelectedItem(slug);
    const res = await fetch(
      `/api/brands?brandSlug=${slug}&storeSlug=${storeSlug}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    setIsDeleting(false);
    if (data.success) {
      setFilteredBrands(data.data);
    }

    setIsDeleting(false);
  }

  return (
    <>
      <div className="">
        <div>
          <TableWrapper className="w-full text-sm text-left text-gray-500 ">
            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-100 h-16 rounded-xl">
              <tr>
                <th scope="col" className="px-6 py-3">
                  brand name
                </th>
                {/* 
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">SubCategories</div>
                </th> */}
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Products</div>
                </th>
                <th scope="col" className="px-6  py-3">
                  <span className="">Edit</span>
                </th>
              </tr>
            </TableHeader>
            <tbody>
              {filteredBrands.map((brand) => (
                <TableRow
                  key={brand.slug}
                  className="bg-white border-b  rounded-full hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center space-x-2 "
                  >
                    <Link
                      href={`/${storeSlug}/admin/brands/${brand.slug}`}
                      className="flex items-center space-x-3 group"
                    >
                      <div className=" w-16">
                        <ImageContainer
                          src={`${
                            brand.image
                              ? brand.image.replace("./public", "")
                              : "/images/placeholder.png"
                          }`}
                        />
                      </div>

                      <div className="group-hover:underline">{brand.name}</div>
                    </Link>
                  </th>

                  {/* <td className="px-6 py-4">
                    {brand.subcategories.length > 0
                      ? brand.subcategories.map((subcategory, idx) => (
                          <span key={idx}>{subcategory.name}</span>
                        ))
                      : "none"}
                  </td> */}
                  <td className="px-6 py-4">{brand.products.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link href={`edit/${brand.slug}`}>
                        <IconButton>
                          <FaPencilAlt />
                        </IconButton>
                      </Link>

                      <IconButton
                        onClick={() => deleteBrand(brand.slug)}
                        color={"error"}
                        isLoading={selectedItem == brand.slug && isDeleting}
                      >
                        <FaTrashAlt />
                      </IconButton>
                    </div>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </TableWrapper>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.query;
  const brands = await prisma.brand.findMany({
    where: {
      store: {
        slug: storeSlug,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: "desc",
      },
    },
    take: 10,
  });

  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands)),
    },
  };
}

BrandsHome.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Brands"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};
export default BrandsHome;
