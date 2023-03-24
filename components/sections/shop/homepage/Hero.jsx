import React, { useRef } from "react";

import { FaDotCircle } from "react-icons/fa";
import Link from "next/link";
import { Card, ImageContainer } from "../../../elements";
import { useRouter } from "next/router";
import { BsDot } from "react-icons/bs";
import Slider from "react-slick";

const Hero = ({ categories }) => {
  const storeSlug = useRouter().query.storeSlug;

  const sliderImages = [
    {
      name: "image1",
      image: "https://loremflickr.com/1024/576?random=1",
    },
    {
      name: "image2",
      image: "https://loremflickr.com/1024/576?random=2",
    },
    {
      name: "image3",
      image: "https://loremflickr.com/1024/576?random=3",
    },
    {
      name: "image4",
      image: "https://loremflickr.com/1024/576?random=4",
    },
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="grid grid-cols-12 gap-4  mt-4">
      <div className="col-span-3 hidden md:block">
        <Card classes={"p-2"}>
          {/* <h1>
            <span className="font-bold">Categories</span>
          </h1> */}
          <ul className="space-y-1 py-2">
            {categories &&
              categories.map((category, idx) => (
                <li key={idx} className="">
                  <Link
                    className="hover:text-primary capitalize font-semibold  py-2 flex items-center text-sm text-gray-700  space-x-2 hover:bg-primary hover:bg-opacity-10 rounded-xl px-2 "
                    href={`/${storeSlug}/products?category=${category.slug}`}
                  >
                    <span>
                      <BsDot />
                    </span>

                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-9">
        {/* <Card classes={"px-4  h-full grid grid-cols-12"}>
          <div className="col-span-6 flex items-center ">
            <div>
              <h1 className="text-4xl font-bold py-4">
                Get high quality products at affordable prices
              </h1>
              <p>
                here at my store we have a wide range of products that are
                affordable and of high quality
              </p>
            </div>
          </div>
          <div className="aspect-square col-span-6 bg-gray-300"></div>
        </Card> */}
        <Card classes={" pb-8"}>
          <Slider ref={sliderRef} {...settings}>
            {sliderImages.map((image, index) => (
              <ImageContainer
                key={index}
                videoAspectRatio
                src={`${
                  image.image.includes("http")
                    ? image.image
                    : `http://localhost:5000/images/products` + image.image
                }`}
                alt={"slider image"}
              />
            ))}
          </Slider>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
