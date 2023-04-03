import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Card, IconButton, ImageContainer, Product } from "../../elements";
import Link from "next/link";
import { useRouter } from "next/router";

const CaregoriesSlider = ({ title, small, products, link, categories }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const slider = React.useRef(null);
  const storeSlug = useRouter().query.storeSlug;

  function next() {
    slider.current.slickNext();
  }
  function prev() {
    slider.current.slickPrev();
  }
  const NextButton = () => (
    <button
      className="bg-secondary rounded-xl hover:bg-primary text-white p-2"
      onClick={() => next()}
    >
      <FaArrowRight />
    </button>
  );

  const PrevButton = () => (
    <button
      className="bg-secondary rounded-xl hover:bg-primary text-white p-2"
      onClick={() => prev()}
    >
      <FaArrowLeft />
    </button>
  );

  return (
    <div classes={"p-2"}>
      <div className="px-2 mb-2">
        <div className="flex justify-between items-center px-2 ">
          <h1 className="text-xl font-bold  capitalize ">
            Featured Categories
          </h1>
          {categories && categories.length > 7 && (
            <div className="flex space-x-2">
              <div className="">
                <PrevButton />
              </div>
              <div className="">
                <NextButton />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="px-2 bg-yellow-300">
        <div className="flex justify-between items-center px-2 py-2 mb-4">
          <h1 className="text-xl font-bold  capitalize ">{title}</h1>
          {link && (
            <div className="px-2 ">
              <Link
                href={link ? link : "/"}
                className={
                  "text-sm font-semibold text-gray-700 hover:text-primary group "
                }
              >
                <span className="flex items-center gap-2 ">
                  <span>View all</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-all" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div> */}

      <div className="relative pb-10 px-2">
        <>
          {categories && categories.length > 7 ? (
            <>
              <Slider ref={slider} {...settings} className="">
                {categories &&
                  categories.map((category, idx) => (
                    <div key={category.id} className="">
                      {/* <Product small product={product} /> */}
                      <Link
                        href={`/${storeSlug}/products?category=${category.slug}`}
                      >
                        <Card
                          classes={"py-2 mx-2 my-2"}
                          // href={`/${storeSlug}/products?category=${storeSlug}`}
                        >
                          <ImageContainer
                            src={
                              category.logo
                                ? category.logo.includes("http")
                                  ? category.logo
                                  : "/product-thumbnails/" + category.logo
                                : `https://loremflickr.com/320/240?random=${idx}`
                            }
                            alt={category.name + " thumbnail"}
                          />
                          <div>
                            <h1 className="text-xs font-semibold pt-4">
                              {category.name}
                            </h1>
                            <div>
                              <small className="text-xs text-gray-500">
                                Items - {category._count.products}
                              </small>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </>
          ) : (
            <ul
              className={`grid grid-cols-4 ${
                small ? "md:grid-cols-6 " : "md:grid-cols-8"
              } `}
            >
              {categories &&
                categories.map((category, idx) => (
                  <div key={category.id} className="">
                    {/* <Product small product={product} /> */}
                    <Link
                      href={`/${storeSlug}/products?category=${category.slug}`}
                    >
                      <Card
                        classes={"py-2 mx-2 my-2"}
                        // href={`/${storeSlug}/products?category=${storeSlug}`}
                      >
                        <ImageContainer
                          src={
                            category.image
                              ? category.image.replace("./public", "")
                              : "https://loremflickr.com/320/240"
                          }
                          alt={category.name + " thumbnail"}
                        />
                        <div>
                          <h1 className="text-xs font-semibold pt-4">
                            {category.name}
                          </h1>
                          <div>
                            <small className="text-xs text-gray-500">
                              Items - {category._count.products}
                            </small>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
            </ul>
          )}
        </>
      </div>
    </div>
  );
};

export default CaregoriesSlider;
