import React from "react";
import DashboardLayout from "../../../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../../../components/layouts/dashboard/SubSectionLayout";

const EditProduct = () => {
  return <div>EditProduct</div>;
};

EditProduct.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit Product"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default EditProduct;
