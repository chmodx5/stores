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

const CreateStore = () => {
  const { data: session } = useSession();

  console.log(session);

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeWhatsappPhone, setStoreWhatsappPhone] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  const [storeLogoPreviewUrl, setStoreLogoPreviewUrl] = useState(null);

  const handleCreateNewStoreForm = async (e) => {
    e.preventDefault();

    // new store object using formData
    const newStore = new FormData();
    newStore.append("name", storeName);
    newStore.append("description", storeDescription);
    newStore.append("location", storeLocation);
    newStore.append("logo", storeLogo);
    newStore.append("email", storeEmail);
    newStore.append("phone", storePhone);
    newStore.append("whatsappPhone", storeWhatsappPhone);
    newStore.append("address", storeAddress);

    console.log(newStore.getAll("email"));

    const response = await fetch("/api/store", {
      method: "POST",
      body: newStore,
    });

    //get the data from the response
    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <button onClick={() => signOut()}>log out</button>
      <Card className="p-8 mt-4 w-96 mx-auto">
        <div className="flex mb-8 flex-col justify-center items-center">
          <Logo />
          <h1 className="text-3xl font-bold">Create Store</h1>
        </div>

        <br />
        <form className="space-y-4" onSubmit={handleCreateNewStoreForm}>
          <TextInput
            type="text"
            label={"Store Name"}
            name="storeName"
            id="storeName"
            className={"flex-1"}
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <TextInput
            type="text"
            label={"Store Description"}
            name="storeDescription"
            id="storeDescription"
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
          />
          <TextInput
            label={"Store Location"}
            type="text"
            name="storeLocation"
            id="storeLocation"
            value={storeLocation}
            onChange={(e) => setStoreLocation(e.target.value)}
          />

          <FileInput
            previewImage={storeLogoPreviewUrl}
            label={"Store logo"}
            onChange={(e) => {
              const selectedImage = e.target.files[0];
              setStoreLogo(selectedImage);
              setStoreLogoPreviewUrl(URL.createObjectURL(selectedImage));
            }}
          />

          <TextInput
            type="text"
            label={"Store Email"}
            name="storeEmail"
            id="storeEmail"
            value={storeEmail}
            onChange={(e) => setStoreEmail(e.target.value)}
          />
          <TextInput
            type="text"
            label={"Store Phone Number"}
            name="storePhone"
            id="storePhone"
            value={storePhone}
            onChange={(e) => setStorePhone(e.target.value)}
          />

          <TextInput
            type="text"
            label={"Whatsapp Phone Number"}
            name="storePhone"
            id="storePhone"
            value={storeWhatsappPhone}
            onChange={(e) => setStoreWhatsappPhone(e.target.value)}
          />
          <TextInput
            type="text"
            label={"Address"}
            name="address"
            id="address"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />

          {/* {isError && (
            <Alert>{error?.data?.message || "Something went wrong"}</Alert>
          )} */}
          <Button type="submit">
            {/* {isLoading ? <LoadingSpinner /> : "Create Store"} */}
            create store
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateStore;
