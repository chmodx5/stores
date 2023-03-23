import React, { useContext } from "react";

import ImageContainer from "../imageContainer/ImageContainer";
import Link from "next/link";
import { storeContext } from "../../../store/storeContext";

const Logo = ({ mini, to }) => {
  const { store } = useContext(storeContext);
  return (
    <Link href={to}>
      <div className="flex items-center space-x-2">
        <div className="relative w-8 aspect-square rounded-full bg-center">
          <ImageContainer
            src={
              store.logo != null
                ? store.logo.includes("http")
                  ? product.thumbnail
                  : "/placeholders/store-placeholder.png"
                : "/placeholders/store-placeholder.png"
            }
            alt={store.name + " logo"}
            className=" bg-center w-full h-full"
          />
        </div>
        {!mini && (
          <h3 className="font-bold text-lg hover:text-primary">
            {store.name != null && store.name}
          </h3>
        )}
      </div>
    </Link>
  );
};

export default Logo;
