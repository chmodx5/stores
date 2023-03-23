import React from "react";
import Link from "next/link";

const Card = ({ classes, flat, children, href, ...props }) => {
  // if the card has a href prop then it will be a link
  // else it will be a div
  let AppComp = href ? Link : "div";

  return (
    <AppComp
      href={href}
      className={`rounded-xl hover:shadow-md transition-all ease-in-out  p-2  ${
        flat ? "shadow-none" : "shadow "
      } ${classes}`}
      {...props}
    >
      {children}
    </AppComp>
  );
};

export default Card;
