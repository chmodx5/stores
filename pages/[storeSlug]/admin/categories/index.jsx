import React from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import {
  IconButton,
  ImageContainer,
  LoadingSpinner,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../../../components/elements";
import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import prisma from "../../../../utils/prismadb";
import { useRouter } from "next/router";

const CategoriesHome = ({ categories }) => {
  const storeSlug = useRouter().query.storeSlug;
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [filteredCategories, setFilteredCategories] =
    React.useState(categories);

  async function deleteCategory(slug) {
    setIsDeleting(true);
    setSelectedItem(slug);
    const res = await fetch(
      `/api/categories?categorySlug=${slug}&storeSlug=${storeSlug}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    setIsDeleting(false);
    if (data.success) {
      setFilteredCategories(data.data);
    }

    setIsDeleting(false);
  }
  // console.log("categories", categories);
  return (
    <>
      <div className="">
        <div>
          <TableWrapper className="w-full text-sm text-left text-gray-500 ">
            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-100 h-16 rounded-xl">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category name
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
              {filteredCategories.map((category) => (
                <TableRow
                  key={category.slug}
                  className="bg-white border-b  rounded-full hover:bg-gray-100"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center space-x-2 "
                  >
                    <Link
                      href={`/${storeSlug}/admin/categories/${category.slug}`}
                      className="flex items-center space-x-3 group"
                    >
                      <div className=" w-16">
                        <ImageContainer
                          src={`${category.image.replace("./public", "")}`}
                        />
                      </div>

                      <div className="group-hover:underline">
                        {category.name}
                      </div>
                    </Link>
                  </th>

                  {/* <td className="px-6 py-4">
                    {category.subcategories.length > 0
                      ? category.subcategories.map((subcategory, idx) => (
                          <span key={idx}>{subcategory.name}</span>
                        ))
                      : "none"}
                  </td> */}
                  <td className="px-6 py-4">{category.products.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link href={`edit/${category.slug}`}>
                        <IconButton>
                          <FaPencilAlt />
                        </IconButton>
                      </Link>

                      <IconButton
                        onClick={() => deleteCategory(category.slug)}
                        color={"error"}
                        isLoading={selectedItem == category.slug && isDeleting}
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
  const categories = await prisma.category.findMany({
    where: {
      stores: {
        every: {
          slug: storeSlug,
        },
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
      stores: {
        select: {
          slug: true,
        },
      },
    },
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

CategoriesHome.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Categories"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};
export default CategoriesHome;
