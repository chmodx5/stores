import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Card, IconButton, Product } from "../../elements";
import Link from "next/link";

const GroupedProducts = ({ title, small, products, link }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: small ? 6 : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: small ? 3 : 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: small ? 4 : 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: small ? 6 : 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: small ? 6 : 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const slider = React.useRef(null);

  function next() {
    slider.current.slickNext();
  }
  function prev() {
    slider.current.slickPrev();
  }
  const NextButton = () => (
    <IconButton size={small ? "sm" : ""} onClick={() => next()}>
      <FaArrowRight />
    </IconButton>
  );

  const PrevButton = () => (
    <IconButton size={small ? "sm" : ""} onClick={() => prev()}>
      <FaArrowLeft />
    </IconButton>
  );

  // get window width

  return (
    <div classes={"p-2"}>
      <Card classes="flex justify-between items-center px-2 py-4 mb-4">
        <h1 className="text-2xl font-bold  capitalize ">{title}</h1>
        {link && (
          <div className="px-2 ">
            <Link
              href={link ? link : "/"}
              className={
                "text-sm font-semibold text-gray-700 hover:text-black group "
              }
            >
              <span className="flex items-center gap-2 ">
                <span>View all</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-all" />
              </span>
            </Link>
          </div>
        )}
      </Card>

      <div className="">
        <div className="relative mb-8">
          <>
            {products && products.length > 4 ? (
              <>
                <Slider ref={slider} {...settings} className="">
                  {products &&
                    products.map((product, idx) => (
                      <div key={product.id} className=" rounded-xl">
                        <Product small product={product} />
                      </div>
                    ))}
                </Slider>
                <div className="absolute  -right-2 top-1/2">
                  <NextButton />
                </div>
                <div className="absolute -left-2 top-1/2">
                  <PrevButton />
                </div>
              </>
            ) : (
              <ul
                className={`grid grid-cols-2 ${
                  small ? "md:grid-cols-6 " : "md:grid-cols-4"
                } `}
              >
                {products &&
                  products.map((product, idx) => (
                    <li key={product.id} className=" rounded-xl">
                      <Product small product={product} />
                    </li>
                  ))}
              </ul>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default GroupedProducts;
