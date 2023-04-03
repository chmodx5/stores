import React from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
// import prisma from "../../../../utils/prismadb";
import ProductsListWithPagination from "../../../../components/sections/shared/ProductsListWithPagination";

const SingleBrand = ({ products, currentPage, totalPages, totalProducts }) => {
  console.log("products", products);
  return (
    <div>
      <ProductsListWithPagination
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.query;
  const { category } = context.query;
  const { brand } = context.query;
  const { brandSlug } = context.query;
  const { q } = context.query;
  const page =
    context.query.page == null || context.query.page == undefined
      ? 1
      : context.query.page;
  const perPage = context.query.perPage || 10;
  const skip = page * perPage - perPage;

  const res = await fetch(
    `http://localhost:3000/api/products?store=${storeSlug}&brand=${brandSlug}`
  );
  const data = await res.json();

  return {
    props: {
      products: data.products,
      currentPage: page,
      totalPages: data.totalPages,
      totalProducts: data.totalProducts,
    },
  };
}

SingleBrand.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Singe Brand"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default SingleBrand;
