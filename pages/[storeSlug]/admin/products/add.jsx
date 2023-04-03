import React, { useState } from "react";
import DashboardLayout from "../../../../components/layouts/dashboard/DashboardLayout";
import SubSectionlayout from "../../../../components/layouts/dashboard/SubSectionLayout";
import {
  Alert,
  AutoComplete,
  Button,
  Card,
  FileInput,
  MultipleFileInput,
  TextAreaInput,
  TextInput,
} from "../../../../components/elements";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FaCheckCircle } from "react-icons/fa";
import prisma from "../../../../utils/prismadb";

const AddProduct = ({ categories, brands }) => {
  const [formErrors, setFormErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  return (
    <div className="py-4">
      <Formik
        initialValues={{
          productName: "",
          productDescription: "",
          productThumbnail: "",
          productImages: [],
          productStock: "",
          productCategory: "",
          productBrand: "",
          productPrice: "",
          productDiscountPrice: "",
        }}
        validationSchema={Yup.object({
          productName: Yup.string()
            .required("Product name is required")
            .min(2, "Product name must be at least 3 characters")
            .max(100, "Product name must be less than 100 characters"),
          productDescription: Yup.string()
            .required("Product description is required")
            .min(2, "Product description must be at least 3 characters")
            .max(400, "Product description must be less than 200 characters"),

          productThumbnail: Yup.mixed()
            .test("fileFormat", "invalid file format", (value, j) => {
              //get the file extension from the value
              //create a new image object from the value as it is the local filepath of the image
              // console.log("value-", value.type);

              if (value) {
                if (value.type === "image/png" || value.type === "image/jpeg") {
                  // console.log(value.type);
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
          productImages: Yup.array().of(
            Yup.mixed()
              .test("fileFormat", "invalid file format", (value, j) => {
                // console.log("value-arr", value.type);

                if (value) {
                  if (
                    value.type === "image/png" ||
                    value.type === "image/jpeg"
                  ) {
                    // console.log(value.type);
                    return true;
                  }
                }
                return false;
              })
              .test("fileSize", "one is file too large max 2mb", (value) => {
                if (value) {
                  if (value.size < 2000000) {
                    return true;
                  }
                }
                return false;
              })
          ),
          productStock: Yup.number().required("Stock is required"),
          productCategory: Yup.string().required("Category is required"),
          productBrand: Yup.string().required("Brand is required"),
          productPrice: Yup.number().required("Price is required"),
          productDiscountPrice: Yup.number(),
        })}
        onSubmit={(values, { setSumitting }) => {
          setFormLoading(true);
          setFormSuccess(false);
          setFormErrors("");

          const newProduct = new FormData();

          newProduct.append("productName", values.productName);
          newProduct.append("productDescription", values.productDescription);
          newProduct.append("productThumbnail", values.productThumbnail);
          // newProduct.append("productImages", values.productImages);
          for (var i = 0; i < values.productImages.length; i++) {
            newProduct.append("productImages", values.productImages[i]);
          }
          newProduct.append("productStock", values.productStock);
          newProduct.append("productCategory", values.productCategory);
          newProduct.append("productBrand", values.productBrand);
          newProduct.append("productPrice", values.productPrice);
          newProduct.append(
            "productDiscountPrice",
            values.productDiscountPrice
          );

          // post request to localhost:3000/api/categories with the new category data
          fetch(`/api/products`, {
            method: "POST",
            body: newProduct,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setFormLoading(false);
              if (data.success) {
                setFormSuccess(true);
                setFormErrors("");
              } else {
                setFormSuccess(false);
                setFormErrors(data.message);
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(formik) => (
          <Form>
            <div className="grid grid-cols-12 gap-6">
              <Card classes={"p-4 col-span-12 md:col-span-8 space-y-6"}>
                <TextInput
                  label="Product Name"
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                />
                <div className="inline-block w-full">
                  <TextInput
                    label="Product Description"
                    textArea
                    name="productDescription"
                    placeholder="Product Description"
                    rows="7"
                  />
                </div>
                <div className="col-span-12 md:col-span-6 space-y-4">
                  <div className="w-1/2">
                    <FileInput
                      label={"Product Thumbnail"}
                      src={"/logo.svg"}
                      name="productThumbnail"
                      formik={formik}
                    />
                  </div>
                  <div>
                    <MultipleFileInput
                      label={"Product images"}
                      name={"productImages"}
                      formik={formik}
                    />
                  </div>
                  {/* <div>
                    <div className="">
                      <FileInput
                        label={"Product Images"}
                        noAspectRatio
                        onChange={(e) => {
                          console.log("thumbnail", e.target.files[0]);
                          setThumbnail(e.target.files[0]);
                          setThumbnailPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </div>
                  
                    <div className=" flex flex-wrap gap-4">
                      {images &&
                        images.map((image, idx) => (
                          <div className="h-20 aspect-square" key={idx}>
                            <FileInput
                              key={idx}
                              mini
                              id={"image" + idx}
                              previewImage={URL.createObjectURL(image)}
                              onChange={(e) => {
                                //set the value of the image at the index
                                setImages((images) => {
                                  images[idx] = e.target.files[0];
                                  return [...images];
                                });
                              }}
                            />
                          </div>
                        ))}

                      <div className="h-20 aspect-square">
                        <FileInput
                          mini
                          id={"image"}
                          onChange={(e) => {
                            if (e.target.files.length === 0) return;
                            setImages((images) => [
                              ...images,
                              e.target.files[0],
                            ]);
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </Card>
              <div className="col-span-12 md:col-span-4 space-y-6">
                <Card classes={"p-4 space-y-6"}>
                  <TextInput
                    type="number"
                    label="Stock / Quantity"
                    name="productStock"
                    placeholder="Stock / Quantity"
                  />
                  <AutoComplete
                    label="Product Category"
                    items={categories}
                    name="productCategory"
                    formik={formik}
                    error={formik.errors.productCategory}
                    getSelected={(e) => {
                      console.log("e", e);
                      formik.setFieldValue("productCategory", e.slug);
                    }}
                  />
                  <AutoComplete
                    label="Product Brand"
                    items={brands}
                    name="productBrand"
                    formik={formik}
                    error={formik.errors.productBrand}
                    getSelected={(e) => {
                      console.log(e);
                      formik.setFieldValue("productBrand", e.slug);
                    }}
                  />
                </Card>
                <Card classes={"p-4 space-y-6"}>
                  {" "}
                  <TextInput
                    label={"product price"}
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                  />
                  <TextInput
                    label={"Discount price"}
                    type="number"
                    name="productDiscountPrice"
                    placeholder="Discount Price"
                  />
                </Card>

                {formErrors && <Alert variant={"error"}>{formErrors}</Alert>}
                {formSuccess && (
                  <Alert variant={"success"}>
                    product created successfully
                  </Alert>
                )}
                <div className=" mt-14 md:mt-0">
                  <Button block isLoading={formLoading} type={"submit"}>
                    Create Product
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4"></div>
            </div>
            {/* <div className="col-span-12">
            {isError && <Alert variant={"error"}>{error?.data?.message}</Alert>}
            {isSuccess && (
              <Alert variant={"success"}>
                created product successfully, browse products
                <Link to={`/${storeSlug}/admin/products`}>here</Link>
                here or{" "}
                <Link
                  onClick={() => {
                    setName("");
                    setPrice("");
                    setDiscountPrice("");
                    setStock("");
                    setDescription("");
                    setCategory("");
                    setBrand("");
                    setThumbnail("");
                    setThumbnailPreview("");
                    setImages([]);
                  }}
                  to={`/${storeSlug}/admin/products/create`}
                >
                  continue adding
                </Link>
              </Alert>
            )}
          </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { storeSlug } = context.params;

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

  const brands = await prisma.brand.findMany({
    select: {
      name: true,
      slug: true,
    },
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      brands: JSON.parse(JSON.stringify(brands)),
    },
  };
}

AddProduct.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <SubSectionlayout pageTitle={"Add Product"}>{page}</SubSectionlayout>
    </DashboardLayout>
  );
};

export default AddProduct;
