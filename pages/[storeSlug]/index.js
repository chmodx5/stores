import React from "react";
import prisma from "./../../utils/prismadb";
import { Hero } from "./../../components/sections/shop";
import { useRouter } from "next/router";
import {
  GroupedProducts,
  CaregoriesSlider,
} from "./../../components/sections/shared";
import StoreLayout from "../../components/layouts/store/StoreLayout";
import { storeContext } from "../../store/storeContext";

const StoreHome = ({ store, categories, productToBeFetched }) => {
  const { setStore } = React.useContext(storeContext);

  React.useEffect(() => {
    setStore(store);
  }, []);

  const storeSlug = useRouter().query.storeSlug;

  return (
    <div>
      <Hero categories={categories} />

      <div className="mt-10">
        <CaregoriesSlider categories={categories} />
      </div>
      <div className=" space-y-4">
        {categories.map((category) => (
          <GroupedProducts
            key={category.id}
            title={category.name}
            link={"/" + storeSlug + "/products?category=" + category.slug}
            products={category.products}
          />
        ))}
      </div>
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
