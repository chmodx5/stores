import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Logo,
  TextInput,
  FileInput,
  LoadingSpinner,
  Alert,
} from "../../components/elements";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { userContext } from "../../store/userContext";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./../api/auth/[...nextauth]";
import prisma from "../../utils/prismadb";

const CreateStore = ({ user }) => {
  const { data: session } = useSession();
  const { setUser } = useContext(userContext);
  const [formErrors, setFormErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  console.log(user);

  const router = useRouter();

  useEffect(() => {
    setUser(user);
    if (user.accounts[0].store) {
      router.push(`/${user.accounts[0].store.slug}/admin`);
    }
  }, []);

  // useEffect(() => {
  //   // if (!session) {
  //   //   router.push("/auth/login");
  //   // }

  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [user]);

  return (
    <div>
      <Card className="p-8 mt-4 w-96 mx-auto">
        <div className="flex mb-8 flex-col justify-center items-center">
          <Logo />
          <h1 className="text-3xl font-bold">Create Store</h1>
        </div>

        <br />
        <Formik
          initialValues={{
            storeName: "",
            storeDescription: "",
            storeLocation: "",
            storeLogo: "",
            storeEmail: "",
            storePhone: "",
            storeWhatsappPhone: "",
            storeAddress: "",
          }}
          validationSchema={Yup.object({
            storeName: Yup.string().required("Required"),
            storeDescription: Yup.string().required("Required"),
            storeLocation: Yup.string().required("Required"),
            storeLogo: Yup.mixed()
              .test("fileFormat", "invalid file format", (value) => {
                if (value) {
                  if (
                    value.type === "image/png" ||
                    value.type === "image/jpeg"
                  ) {
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
              }),
            storeEmail: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            storePhone: Yup.string().required("Required"),
            storeWhatsappPhone: Yup.string().required("Required"),
            storeAddress: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // console.log(values);
            setFormLoading(true);
            setFormSuccess(false);
            setFormErrors("");

            const newStore = new FormData();

            newStore.append("name", values.storeName);
            newStore.append("description", values.storeDescription);
            newStore.append("location", values.storeLocation);
            newStore.append("logo", values.storeLogo);
            newStore.append("email", values.storeEmail);
            newStore.append("phone", values.storePhone);
            newStore.append("whatsappPhone", values.storeWhatsappPhone);
            newStore.append("address", values.storeAddress);

            fetch("/api/stores", {
              method: "POST",
              body: newStore,
            })
              .then((res) => res.json())
              .then((data) => {
                setFormLoading(false);
                if (data.success) {
                  setFormSuccess(true);
                  setFormErrors("");
                  //wait for 2 seconds then redirect to store page
                  setTimeout(() => {
                    router.push(`/${data.store.slug}/admin`);
                  }, 2000);
                } else {
                  setFormSuccess(false);
                  setFormErrors(data.message);
                }
              })
              .catch((err) => {
                setFormLoading(false);
                setFormSuccess(false);
                setFormErrors("Something went wrong");
              });
          }}
        >
          {(formik) => (
            <Form>
              <div className="space-y-4">
                {console.log(formik.errors)}
                <TextInput
                  type="text"
                  label={"Store Name"}
                  name="storeName"
                  className={"flex-1"}
                  placeholder={"Store Name"}
                />
                <TextInput
                  type="text"
                  label={"Store Description"}
                  name="storeDescription"
                  placeholder={"Store Description"}
                />
                <TextInput
                  label={"Store Location"}
                  type="text"
                  name="storeLocation"
                  placeholder={"Store Location"}
                />

                <FileInput
                  label={"Store logo"}
                  name="storeLogo"
                  formik={formik}
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                />

                <TextInput
                  type="text"
                  label={"Store Email"}
                  name="storeEmail"
                  placeholder={"Store Email"}
                />
                <TextInput
                  type="text"
                  label={"Store Phone Number"}
                  name="storePhone"
                  placeholder={"Store Phone Number"}
                />

                <TextInput
                  type="text"
                  label={"Whatsapp Phone Number"}
                  name="storeWhatsappPhone"
                  placeholder={"Whatsapp Phone Number"}
                />
                <TextInput
                  type="text"
                  label={"Address"}
                  name="storeAddress"
                  placeholder={"Address"}
                />

                {formErrors && (
                  <Alert variant={"error"}>
                    {formErrors || "Something went wrong"}
                  </Alert>
                )}

                {formSuccess && (
                  <Alert variant={"success"}>Store created successfully</Alert>
                )}
                <Button type="submit" isLoading={formLoading} block>
                  {/* {isLoading ? <LoadingSpinner /> : "Create Store"} */}
                  create store
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      accounts: {
        include: {
          store: true,
          accountSettings: true,
        },
      },
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default CreateStore;
