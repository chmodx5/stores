import React, { useContext } from "react";
import { NavbarLink, Search, StoreLogo } from "..";
import { useRouter } from "next/router";
import { storeContext } from "../../../store/storeContext";

const Navbar = () => {
  const storeSlug = useRouter().query.storeSlug;
  const { store } = useContext(storeContext);

  console.log("navbar-context", store);
  const navbar_links = [
    {
      href: "/" + storeSlug,
      text: "Home",
    },
    {
      href: "/" + storeSlug + "/about",
      text: "About",
    },
  ];
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* app logo */}
        <>
          <StoreLogo to={`/${storeSlug}`} />
        </>

        {/* search */}
        <div className="flex">
          <Search />
        </div>

        {/* navbar links */}
        <div className="items-center justify-between ">
          <ul className="flex  ">
            {navbar_links.map((link, idx) => (
              <NavbarLink key={idx} href={link.href} text={link.text} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
