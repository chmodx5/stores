import React from "react";
import { Navbar } from "../../elements";
import { useRouter } from "next/router";

const StoreLayout = ({ children }) => {
  const storeSlug = useRouter().query.storeSlug;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default StoreLayout;
