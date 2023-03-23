import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarLink = ({ href, text, props }) => {
  const currentLink = useRouter().asPath;
  console.log(currentLink, href);
  return (
    <Link
      href={href}
      {...props}
      className={`${
        currentLink != href
          ? "block px-2 hover:text-primary font-semibold"
          : "block px-2 hover:text-primary font-semibold text-primary"
      }`}
    >
      {text}
    </Link>
  );
};

export default NavbarLink;
