import React, { useEffect, useContext } from "react";
// import { Card, Product } from "../../../components/elements";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import prisma from "../../utils/prismadb";
import { Card, Product } from "../../components/elements";
import StoreLayout from "../../components/layouts/store/StoreLayout";
import { storeContext } from "./../../store/storeContext";

const StoreProducts = ({ products, store }) => {
  const router = useRouter().query;

  const { setStore } = useContext(storeContext);

  useEffect(() => {
    setStore(store);
  }, []);

  if (!store) {
    return (
      <div>
        <Card>
          <h1 className="text-2xl font-bold capitalize">Store not found</h1>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card classes="p-6 mt-4">
        <div className="flex space-x-4 items-center">
          {/* {!category && !brand && (
            <h1 className="text-2xl font-bold capitalize">All Products</h1>
          )} */}
          {router.category && (
            <h1 className="text-2xl font-bold capitalize">
              <span className="text-primary">category</span> - {router.category}
            </h1>
          )}
          {router.category && router?.brand && (
            <FaChevronRight className="text-gray-500" />
          )}
          {router.brand && (
            <>
              <h1 className="text-2xl font-bold capitalize">{router.brand}</h1>
            </>
          )}
        </div>
        <h6 className="text-sm text-gray-500 mt-4">
          Found {products == null ? "0" : products.length} products
        </h6>
      </Card>
      <br />
      <br />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products != null ? (
          products.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <>
            <Card classes={"text-xl p-4 font-semibold "}>
              No products found
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.query;
  const { category } = context.query;
  const { brand } = context.query;
  const { q } = context.query;
  let products = [];

  const store = await prisma.store.findUnique({
    where: {
      slug: storeSlug,
    },
  });

  if (q && !category && !brand) {
    const searchQ = q.replaceAll("-", " ");
    products = await prisma.product.findMany({
      where: {
        store: {
          slug: storeSlug,
        },
        name: {
          contains: searchQ,
          mode: "insensitive",
        },
      },
      include: {
        brand: true,
        category: true,
        user: true,
        // store: true,
      },
      take: 10,
    });
  }

  if (category && !brand && !q) {
    products = await prisma.product.findMany({
      where: {
        store: {
          slug: storeSlug,
        },
        category: {
          slug: category,
        },
      },
      include: {
        brand: true,
        category: true,
        user: true,
        store: true,
      },
    });

    if (products.length == 0) {
      products = null;
    }
  }

  if (brand && !category && !q) {
    products = await prisma.product.findMany({
      where: {
        store: {
          slug: storeSlug,
        },
        brand: {
          slug: brand,
        },
      },
      include: {
        brand: true,
        category: true,
        user: true,
        store: true,
      },
    });

    if (products.length == 0) {
      products = null;
    }
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      store: JSON.parse(JSON.stringify(store)),
    },
  };
}

StoreProducts.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};
export default StoreProducts;
