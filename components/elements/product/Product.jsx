import React from "react";
import ImageContainer from "../imageContainer/ImageContainer";
import Card from "../cards/Card";
import Link from "next/link";
import { useRouter } from "next/router";

const Product = ({ small, product }) => {
  const storeSlug = useRouter().query.storeSlug;
  return (
    <Card>
      <Link href={`/${storeSlug}/product/${product.slug}`}>
        <div className="aspect-square">
          <ImageContainer
            src={
              product.thumbnail.includes("http")
                ? product.thumbnail
                : import.meta.env.VITE_BASE_API_IMAGES_URL +
                  "/product-thumbnails/" +
                  product.thumbnail
            }
            alt={product.name + " thumbnail"}
          />
        </div>
        <div className="mt-4">
          {/* <Link
            className="group"
            href={`/${storeSlug}/products?brand=${product.brand.slug}`}
          > */}
          <small className="text-xs hover:pointer group-hover:text-primary">
            <span className="text-gray-500">{product.brand.name}</span>
          </small>
          {/* </Link> */}
          <h3
            className={`${
              small ? "text-sm" : "text-base"
            } font-semibold capitalize `}
          >
            {product.name}
          </h3>
          <small>
            category :{" "}
            <span className="text-primary">
              {/* {product.categories.map((category) => (
                <span key={category.id}>{category.name}</span>
              ))} */}
              {product.category.name}
            </span>
          </small>
          <p className="text-sm font-semibold  text-gray-500 space-x-2 mt-2">
            <span className="text-primary">
              <span>kes :</span>
              <span>{product.price}</span>
            </span>
            {product.discountPrice && (
              <span className="line-through decoration-2 decoration-gray-500">
                <span>kes :</span>
                <span>{product.discountPrice}</span>
              </span>
            )}
          </p>
          {/* <small>{product.storeId}</small> */}
        </div>
      </Link>
    </Card>
  );
};

export default Product;
