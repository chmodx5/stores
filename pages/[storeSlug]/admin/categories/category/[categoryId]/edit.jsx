import React from "react";
import DashboardLayout from "../../../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../../../components/layouts/dashboard/SubSectionLayout";

const EditCategory = () => {
  return <div>EditCategory</div>;
};

EditCategory.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit Category"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default EditCategory;
