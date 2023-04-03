import React from "react";
import DashboardLayout from "../../../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../../../components/layouts/dashboard/SubSectionLayout";

const EditBrand = () => {
  return <div>EditBrand</div>;
};

EditBrand.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit Brand"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default EditBrand;
