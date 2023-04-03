import React from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";

const Analytics = () => {
  return <div>Analytics</div>;
};

Analytics.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Products"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};
export default Analytics;
