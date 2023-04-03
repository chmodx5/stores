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
import { useSession } from "next-auth/react";

const StoreHome = ({ store, categories, productToBeFetched }) => {
  const { setStore } = React.useContext(storeContext);
  ///get

  console.log(categories);
  const { data: session, status } = useSession();

  console.log("session", session);

  // console.log(categories);

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
        {categories.map((category) => {
          if (category.products.length > 0) {
            return (
              <GroupedProducts
                key={category.id}
                title={category.name}
                link={"/" + storeSlug + "/products?category=" + category.slug}
                products={category.products}
              />
            );
          } else {
            return null;
          }
        })}
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

  // const users = await prisma.user.findMany();
  // const accounts = await prisma.account.findMany();

  // console.log("users", users);
  // console.log("accounts", accounts);

  const categories = await prisma.category.findMany({
    where: {
      stores: {
        every: {
          slug: context.query.storeSlug,
        },
      },
      // products: {
      //   some: {
      //     brandId: {
      //       not: null,
      //     },
      //     categoryId: {
      //       not: null,
      //     },
      //   },
      // },
    },
    select: {
      _count: true,
      id: true,
      name: true,
      slug: true,
      image: true,
      products: {
        select: {
          id: true,
          name: true,
          slug: true,
          thumbnail: true,
          price: true,
          discountPrice: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        take: 10,
      },
    },
    take: 10,
    // include: {
    //   products: {
    //     include: {
    //       _count: true,
    //       brand: true,
    //       category: true,
    //     },
    //     take: 10,
    //   },
    // },
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
