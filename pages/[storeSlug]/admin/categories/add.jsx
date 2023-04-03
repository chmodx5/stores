import React, { useState } from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import {
  Alert,
  Button,
  Card,
  FileInput,
  LoadingSpinner,
  TextAreaInput,
  TextInput,
} from "../../../../components/elements";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCheckCircle } from "react-icons/fa";
// import prisma from "../../../../utils/prismadb";

const AddCategory = () => {
  const [formErrors, setFormErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          categoryName: "",
          categoryDescription: "",
          categoryImage: "",
        }}
        validationSchema={Yup.object({
          categoryName: Yup.string()
            .required("Category name is required")
            .min(3, "Category name must be at least 3 characters")
            .max(100, "Category name must be less than 100 characters"),
          categoryDescription: Yup.string()
            .required("Category description is required")
            .min(3, "Category description must be at least 3 characters")
            .max(100, "Category description must be less than 200 characters"),
          categoryImage: Yup.mixed()
            .test("fileFormat", "invalid file format", (value, j) => {
              //get the file extension from the value
              //create a new image object from the value as it is the local filepath of the image
              console.log("value-", value.type);

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

          const newCategory = new FormData();

          newCategory.append("categoryImage", values.categoryImage);
          newCategory.append("categoryName", values.categoryName);
          newCategory.append("categoryDescription", values.categoryDescription);

          // post request to localhost:3000/api/categories with the new category data
          fetch("/api/categories", {
            method: "POST",
            body: newCategory,
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
            <Card classes=" p-8 max-w-md mx-auto space-y-4">
              <div className="w-1/2">
                <FileInput
                  mini
                  label={"Category Icon"}
                  src={"/logo.svg"}
                  name="categoryImage"
                  formik={formik}
                  // previewImage={categoryImagePreview}
                  // onChange={(e) => {
                  //   setCategoryImage(e.target.files[0]);
                  //   setCategoryImagePreview(
                  //     URL.createObjectURL(e.target.files[0])
                  //   );
                  // }}
                />
              </div>
              <TextInput
                label="Category Name"
                type="text"
                name="categoryName"
                placeholder="Category Name"
              />
              <TextInput
                label="Category Description"
                textArea
                name="categoryDescription"
                placeholder="Category Description"
                rows="7"
              />

              <div>
                {formErrors ? (
                  <Alert variant={"error"} className="">
                    {formErrors}
                  </Alert>
                ) : null}
              </div>
              <div>
                {formSuccess ? (
                  <Alert variant={"success"} className="">
                    <div className="flex items-center space-x-4">
                      <span>Category created successfully </span>
                      <span>
                        <FaCheckCircle />
                      </span>
                    </div>
                  </Alert>
                ) : null}
              </div>

              <Button block type="submit">
                create category
                {formLoading ? <LoadingSpinner /> : null}
              </Button>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddCategory.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Edit category"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default AddCategory;
