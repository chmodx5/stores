import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  Button,
  Card,
  Chip,
  ImageContainer,
  LoadingSpinner,
  Rating,
} from "../../../components/elements";

import GroupedProducts from "../../../components/sections/shared/GroupedProducts";
import prisma from "../../../utils/prismadb";
import StoreLayout from "../../../components/layouts/store/StoreLayout";

const StoreSingleProduct = ({ product }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  console.log(product);

  return (
    <>
      <div>single</div>

      <div className="px-10">
        <div className="grid grid-cols-12 space-x-6 pt-2 pb-20 ">
          <div className="col-span-12 mb-10 md:col-span-7 lg:col-span-6">
            <div classes="p-0 w-9/12 mx-auto ">
              <Slider ref={sliderRef} {...settings}>
                {product.images.split(",").map((image, index) => (
                  <ImageContainer
                    key={index}
                    src={`${
                      image.includes("http")
                        ? image
                        : `http://localhost:5000/images/products` + image
                    }`}
                    alt={"slider image"}
                  />
                ))}
              </Slider>
            </div>

            <div className="flex  space-x-4 mt-4 md:mt-8">
              {product.images.split(",").map((image, idx) => (
                <div
                  key={idx}
                  className={`w-12 md:w-16 shadow hover:shadow-xl hover:scale-110 transition-all hover:outline  hover:outline-primary hover:outline-2  rounded-xl ${
                    currentSlide == idx
                      ? "outline outline-primary outline-2"
                      : ""
                  }`}
                >
                  <ImageContainer
                    src={`${
                      image.includes("http")
                        ? image
                        : `http://localhost:5000/images/products` + image
                    }`}
                    alt="product thumbnail image"
                    onClick={() => {
                      setCurrentSlide(idx);
                      sliderRef.current.slickGoTo(idx);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            <div className="mt-8">
              <div className="mb-4">
                <Chip variant={"success"}>In stock</Chip>
              </div>
              <h1 className="text-2xl mb-2 font-bold capitalize">
                {product.name}
              </h1>
              <div className="mb-4">
                <Rating totalStars={3.4} />
              </div>
              <h3 className="text-xl font-bold space-x-2">
                {product.slashedPrice ? (
                  <span className="line-through decoration-2 decoration-gray-500 text-gray-500 text-xl">
                    <span>kes :</span>
                    <span>{product.slashedPrice}</span>
                  </span>
                ) : (
                  <span>
                    <span className=" ">Kes </span>
                    <span className=""> {product.price}</span>
                  </span>
                )}
              </h3>
              <div className="text-sm space-y-2 mt-4 font-semibold mb-6  ">
                <p>
                  <span className="">CATEGORY :</span>
                  <span>
                    {" "}
                    {/* {product.categories.map((category) => category.name)} */}
                    {product.category.name}
                  </span>
                </p>
                <p>
                  <span>BRAND :</span>
                  <span> {product.brand.name}</span>
                </p>
              </div>

              <a
                href="https://wa.me/+254746405792?text=I'm%20interested%20in%20your%20car%20for%20sale%20https://momentjs.com/"
                target="_blank"
              >
                <Button>Order on whatsapp </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-14 px-2">
          <h1 className="font-semibold text-xl mb-2 underline decoration-4">
            Product description
          </h1>

          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>

        <div>
          {/* <GroupedProducts
            small={true}
            title={"Related products"}
            products={relatedProducts}
          /> */}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.productSlug,
    },
    include: {
      brand: true,
      category: true,
    },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: [],
    },
  };
}

StoreSingleProduct.getLayout = function getLayout(page) {
  return <StoreLayout>{page}</StoreLayout>;
};
export default StoreSingleProduct;
