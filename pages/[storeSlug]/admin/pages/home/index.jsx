import React from "react";
import DashboardLayout from "../../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../../components/layouts/dashboard/SubSectionLayout";

const EditHomePage = () => {
  return <div>EditHomePage</div>;
};

EditHomePage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit Homepage"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};
export default EditHomePage;
