import React, { useState } from "react";

import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import {
  Alert,
  Button,
  FileInput,
  FormWrapperCard,
  TextInput,
} from "../../../../components/elements";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCheckCircle } from "react-icons/fa";

const AddBrand = () => {
  const [formErrors, setFormErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  function handleCreateBrandForm(e) {
    e.preventDefault();
    const newBrand = new FormData();
    newBrand.append("brandImage", brandImage);
    newBrand.append("brandName", brandName);
    createBrand(newBrand);
  }
  return (
    <div>
      {" "}
      <Formik
        initialValues={{
          brandName: "",
          brandImage: "",
        }}
        validationSchema={Yup.object({
          brandName: Yup.string()
            .required("Category name is required")
            .min(2, "Category name must be at least 3 characters")
            .max(100, "Category name must be less than 100 characters"),

          brandImage: Yup.mixed()
            .test("fileFormat", "invalid file format", (value, j) => {
              //get the file extension from the value
              //create a new image object from the value as it is the local filepath of the image
              // console.log("value-", value.type);

              if (value) {
                if (value.type === "image/png" || value.type === "image/jpeg") {
                  console.log(value.type);
                  return true;
                }
              }
              return false;
            })
            .test("fileSize", "file too large max 2mb", (value) => {
              if (value) {
                if (value.size < 2000000) {
                  return true;
                }
              }
              return false;
            })
            .required("Category image is required "),
        })}
        onSubmit={(values, { setSumitting }) => {
          setFormLoading(true);

          const newBrand = new FormData();

          newBrand.append("brandImage", values.brandImage);
          newBrand.append("brandName", values.brandName);

          // post request to localhost:3000/api/categories with the new category data
          fetch("/api/brands", {
            method: "POST",
            body: newBrand,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.success) {
                setFormSuccess(true);
                setFormLoading(false);
              } else {
                setFormErrors(data.message);
                setFormLoading(false);
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(formik) => (
          <Form>
            <FormWrapperCard classes="mx-auto  max-w-md space-y-4">
              <div className="w-1/2">
                <FileInput
                  mini
                  label={"Brand Icon"}
                  src={"/logo.svg"}
                  name="brandImage"
                  formik={formik}
                />
              </div>

              <TextInput
                label="Brand Name"
                type="text"
                name="brandName"
                placeholder="Brand Name"
              />

              <div>
                {formSuccess ? (
                  <Alert variant={"success"} className="">
                    <div className="flex items-center space-x-4">
                      <span>Brand created successfully </span>
                      <span>
                        <FaCheckCircle />
                      </span>
                    </div>
                  </Alert>
                ) : null}
              </div>
              <Button block isLoading={formLoading}>
                Create Brand
              </Button>
            </FormWrapperCard>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddBrand.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Add Brand"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default AddBrand;
