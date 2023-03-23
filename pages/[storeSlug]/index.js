import React from "react";
import prisma from "./../../utils/prismadb";
import { Hero } from "./../../components/sections/shop";
import { useRouter } from "next/router";
import { GroupedProducts } from "./../../components/sections/shared";
import StoreLayout from "../../components/layouts/store/StoreLayout";

const StoreHome = ({ store, categories, productToBeFetched }) => {
  console.log("productToBeFetched", productToBeFetched);
  const storeSlug = useRouter().query.storeSlug;
  console.log(categories);
  return (
    <div>
      <Hero categories={categories} />
      {/* {categories.map((category) => (
        <GroupedProducts
          key={category.id}
          title={category.name}
          link={"/" + storeSlug + "/products?category=" + category.slug}
          products={category.products}
        />
      ))} */}
      {categories.map((category) => (
        <GroupedProducts
          key={category.id}
          title={category.name}
          link={"/" + storeSlug + "/products?category=" + category.slug}
          products={category.products}
        />
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const store = await prisma.store.findUnique({
    where: {
      slug: context.query.storeSlug,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeIds: {
        has: store.id,
      },
    },
    include: {
      products: {
        include: {
          brand: true,
          category: true,
        },
        take: 10,
      },
    },
  });
  let errorMessage = "";
  let isSuccess = false;

  if (!store) {
    errorMessage = "stores not found";
    isSuccess = false;
  }

  isSuccess = true;

  return {
    props: {
      productToBeFetched: context.query.storeSlug,
      message: errorMessage,
      isSuccess: isSuccess,
      store: JSON.parse(JSON.stringify(store)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

StoreHome.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};

export default StoreHome;
