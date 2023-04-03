import React from "react";
import { Button, ImageContainer, Logo } from "../../elements";
import Link from "next/link";
import { signIn } from "next-auth/react";

const GuestHero = () => {
  return (
    <section className=" body-font font-bold">
      <div className="container mx-auto flex  py-24 md:flex-row flex-col items-center ">
        <div className="lg:flex-grow order-2   md:order-1 md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <Logo />
          <div className="font-extrabold text-4xl mb-8 mt-4">
            <h1 className="text-primary text-6xl mb-6 ">Maduka</h1>

            <h1 className=" text-3xl ">Get your business or merch online</h1>
          </div>

          <div className="w-3/4 md:hidden">
            <ImageContainer alt="shopping icon" src={"./hero.svg"} />
          </div>
          <div>
            <p className="mb-8 leading-relaxed hidden md:block ">
              Maduka is a platform that allows you to sell your products online
              and manage your business. It is free to use and you can start
              selling your products in minutes.
            </p>
          </div>
          <h3 className="md:hidden mt-6 md:mt-0 title-font sm:text-xl text-xl mb-4 font-bold text-gray-900">
            Sign up for free and start selling your products online
          </h3>

          <br />
          <div className="flex space-x-4">
            <Link href={"/new/store"}>
              <Button color="primary" variant="solid" size="xl">
                Get Started
              </Button>
            </Link>

            <Button
              onClick={() => signIn()}
              color="primary"
              variant="outline"
              size="xl"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="hidden md:w-1/2  w-5/6 order-1 md:order-2 md:flex items-center justify-center">
          <div className="w-3/4">
            <ImageContainer alt="shopping icon" src={"./hero.svg"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestHero;
