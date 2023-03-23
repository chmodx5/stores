import Link from "next/link";
import React from "react";

const TextLink = ({ children, ...props }) => {
  return (
    <Link className="underline text-gray-700 hover:text-primary" {...props}>
      {children}
    </Link>
  );
};

export default TextLink;
