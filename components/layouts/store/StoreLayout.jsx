import React from "react";
import { Navbar } from "../../elements";
import { useRouter } from "next/router";

const StoreLayout = ({ children }) => {
  const storeSlug = useRouter().query.storeSlug;

  return (
    <div className="">
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto px-2">{children}</main>
    </div>
  );
};

export default StoreLayout;
