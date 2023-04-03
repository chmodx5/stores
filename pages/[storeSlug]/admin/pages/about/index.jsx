import React from "react";
import DashboardLayout from "../../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../../components/layouts/dashboard/SubSectionLayout";

const EditAbout = () => {
  return <div>EditAbout</div>;
};

EditAbout.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit About Page"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default EditAbout;
