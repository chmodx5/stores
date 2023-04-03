import React, { useEffect } from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionLayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import {
  Button,
  Card,
  IconButton,
  Product,
} from "../../../../components/elements";
import prisma from "../../../../utils/prismadb";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { getSession } from "next-auth/react";

const ProductsHome = ({ products, currentPage, totalPages, totalProducts }) => {
  const router = useRouter();
  console.log("router", router);

  console.log("total products", products);

  console.log("current page is", currentPage);

  const ResultsHeader = () => {
    if (
      (router.query.category == null || router.query.category == undefined) &&
      (router.query.brand == null || router.query.brand == undefined) &&
      (router.query.q == null || router.query.q == undefined)
    ) {
      return <h1 className="text-xl font-bold capitalize">Latest Products</h1>;
    }
    if (
      (router.query.category == null || router.query.category == undefined) &&
      (router.query.brand != null || router.query.brand != undefined) &&
      (router.query.q == null || router.query.q == undefined)
    ) {
      return (
        <h1 className="text-xl font-bold capitalize">
          Brand - {router.query.brand}
        </h1>
      );
    }
    if (
      (router.query.category != null || router.query.category != undefined) &&
      (router.query.brand == null || router.query.brand == undefined) &&
      (router.query.q == null || router.query.q == undefined)
    ) {
      return (
        <h1 className="text-xl font-bold capitalize">
          Category - {router.query.category}
        </h1>
      );
    }
    if (
      (router.query.category == null || router.query.category == undefined) &&
      (router.query.brand == null || router.query.brand == undefined) &&
      (router.query.q != null || router.query.q != undefined)
    ) {
      return (
        <h1 className="text-xl font-bold capitalize">
          Search - {router.query.q}
        </h1>
      );
    }
  };

  const handlePagination = (page) => {
    let baseUrl = router.asPath.split("?")[0];
    let query = router.query;

    //get every value in the query object where the key is not page
    let newQuery = Object.keys(query)
      .filter((key) => key !== "page" && key !== "storeSlug")
      .reduce((obj, key) => {
        obj[key] = query[key];
        return obj;
      }, {});

    //stringify the new query object to be like page=10
    let newQueryString = Object.keys(newQuery)
      .map((key) => key + "=" + newQuery[key])
      .join("&");

    let newUrl = baseUrl + "?" + newQueryString + "page=" + page;

    if (router.query.page == null || router.query.page == undefined) {
      router.push({
        pathname: router.asPath,
        query: {
          page: page,
        },
      });
    } else {
      router.push(newUrl);
    }

    console.log("page", page);

    // router.push({
    //   pathname: router.asPath,
    //   query: {
    //     page: i + 1,
    //   },
    // });
  };

  return (
    <div className="pb-4">
      <Card classes="p-4 mt-2 mb-2">
        <div className="flex space-x-4 items-center">
          <ResultsHeader />
        </div>
        <h6 className="text-sm text-gray-500 mt-2">
          Found {totalProducts} products
        </h6>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-2">
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

      <Card classes="inline-flex py-4 items-center space-x-4">
        {currentPage > 1 && (
          <button
            onClick={() => handlePagination(parseInt(currentPage) - 1)}
            className="inline-flex items-center space-x-2 group"
          >
            <div
              onClick={() => handlePagination(parseInt(currentPage) - 1)}
              className="h-8 w-8 font-semibold text-gray-700 group-hover:bg-primary rounded-full transition-all duration-200 ease-in-out group-hover:text-white inline-flex items-center justify-center"
            >
              <FaChevronLeft />
            </div>
            <div className="text-sm font-semibold capitalize">prev</div>
          </button>
        )}

        <small>
          {currentPage} of {totalPages}
        </small>

        {
          <button
            onClick={() => handlePagination(parseInt(currentPage) + 1)}
            className="inline-flex items-center space-x-2 group"
          >
            <div className="text-sm font-semibold capitalize">next</div>
            <div className="h-8 w-8 font-semibold text-gray-700 group-hover:bg-primary rounded-full transition-all duration-200 ease-in-out group-hover:text-white inline-flex items-center justify-center">
              <FaChevronLeft className="rotate-180" />
            </div>
          </button>
        }
      </Card>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.query;
  const { category } = context.query;
  const { brand } = context.query;
  const { q } = context.query;
  const page =
    context.query.page == null || context.query.page == undefined
      ? 1
      : context.query.page;
  const perPage = context.query.perPage || 10;
  const skip = page * perPage - perPage;

  const session = await getSession(context);
  console.log("page", session);

  let products = [];
  let totalProducts = 0;
  let totalPages = 0;

  const store = await prisma.store.findUnique({
    where: {
      slug: storeSlug,
    },
  });

  if (!q && !category && !brand) {
    totalProducts = await prisma.product.count({
      where: {
        store: {
          slug: storeSlug,
        },
        categoryId: {
          not: null,
        },
        brandId: {
          not: null,
        },
      },
    });

    totalPages = Math.ceil(totalProducts / perPage);

    products = await prisma.product.findMany({
      where: {
        store: {
          slug: storeSlug,
        },
        categoryId: {
          not: null,
        },
        brandId: {
          not: null,
        },
      },
      include: {
        brand: true,
        category: true,
        user: true,
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip || 0,
      take: 15,
    });
  }

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
      totalPages,
      currentPage: page,
      totalProducts: totalProducts,
      products: JSON.parse(JSON.stringify(products)),
      store: JSON.parse(JSON.stringify(store)),
    },
  };
}
ProductsHome.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionLayout pageTitle={"Products"}>{page}</SubSectionLayout>
    </DashboardLayout>
  );
};

export default ProductsHome;
