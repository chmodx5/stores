import React from "react";

import { FaDotCircle } from "react-icons/fa";
import Link from "next/link";
import { Card } from "../../../elements";
import { useRouter } from "next/router";

const Hero = ({ categories }) => {
  const storeSlug = useRouter().query.storeSlug;

  return (
    <div className="grid grid-cols-12 gap-4  mt-4">
      <div className="col-span-3 hidden md:block">
        <Card classes={"p-2"}>
          <h1>
            <span className="font-bold">Categories</span>
          </h1>
          <ul className="space-y-1 py-2">
            {categories &&
              categories.map((category, idx) => (
                <li key={idx} className="">
                  <Link
                    className="hover:text-primary capitalize font-semibold  py-2 flex items-center  space-x-2 hover:bg-primary hover:bg-opacity-10 rounded-xl px-2 "
                    href={`/${storeSlug}/products?category=${category.slug}`}
                  >
                    <FaDotCircle className="text-xs" />{" "}
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Card classes={"px-10"}>
          <div className="flex space-x-2 items-center">
            <div className="-mt-10">
              <h1 className="text-4xl font-bold py-4">
                Premium clothes for <br /> Premium people
              </h1>
              <p>
                lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam
              </p>
            </div>
            <div className="aspect-square w-1/2 bg-gray-300"></div>
          </div>
        </Card>
        {/* <Card>
          <div className="h-56 sm:h-64 xl:h-[27rem] 2xl:h-96">
            <Carousel slideInterval={5000}>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                alt="..."
                className="rounded-xl"
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                alt="..."
              />
            </Carousel>
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default Hero;
