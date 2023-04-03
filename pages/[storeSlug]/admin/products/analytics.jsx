import React from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import { AnalyticsTotalsCard } from "../../../../components/elements";
import prisma from "../../../../utils/prismadb";
const Analytics = ({ totalProducts, totalBrands, totalCategories }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      <AnalyticsTotalsCard label={"total orders"} value={30} />
      <AnalyticsTotalsCard label={"total products"} value={totalProducts} />
      <AnalyticsTotalsCard label={"total brands"} value={totalBrands} />
      <AnalyticsTotalsCard label={"total categories"} value={totalCategories} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const totalProducts = await prisma.product.count({
    where: {
      store: {
        slug: context.params.storeSlug,
      },
    },
  });

  const totalBrands = await prisma.brand.count({
    where: {
      products: {
        some: {
          store: {
            slug: context.params.storeSlug,
          },
        },
      },
    },
  });

  const totalCategories = await prisma.category.count({
    where: {
      stores: {
        every: {
          slug: context.params.storeSlug,
        },
      },
    },
  });

  return {
    props: {
      totalProducts,
      totalBrands,
      totalCategories,
    },
  };
}

Analytics.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Products Analytics"}>
        {page}
      </SubSectionlayout>
    </DashboardLayout>
  );
};
export default Analytics;
