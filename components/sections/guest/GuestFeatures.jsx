import React from "react";
import { Card } from "../../elements";
import { RiFileEditFill } from "react-icons/ri";
import { MdScreenSearchDesktop } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";

const GuestFeatures = () => {
  return (
    <section className="text-center md:text-left">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          What is{" "}
          <span className="transition-all ease-in-out  text-primary">
            Maduka
          </span>
        </h1>
        <p className="md:w-8/12 ">
          Maduka is the ultimate e-commerce platform that enables you to create
          your own online store and sell your products or services with ease. We
          are committed to providing you with the best-in-class features and
          functionality, including a powerful storefront, secure payment
          processing, and a comprehensive dashboard to manage your store.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {[
          {
            title: "Admin dashboard",
            description:
              "Intuitive  website management for owners by streamlining tasks like creating pages, publishing posts, and analyzing user behavior, enabling better decision-making and growth.",

            icon: <RiFileEditFill />,
          },
          {
            title: "SEO friendly",
            description:
              "Our website is built with SEO-first and SSR technology, optimizing search engine rankings and delivering fast performance. Prioritized elements improve online presence, and quick content delivery enhances user experience",
            icon: <MdScreenSearchDesktop />,
          },
          {
            title: "Analytics",
            description:
              " Gain valuable insights into your audience and optimize business performance with data-driven decisions that drive growth. Stay ahead of the curve and achieve your goals with this powerful feature.",
            icon: <SiGoogleanalytics />,
          },
        ].map((feature, index) => (
          <Card classes={"group px-8 py-6"} key={index}>
            <div>
              <div className="flex justify-center md:justify-start group-hover:text-primary">
                <span className="text-6xl">{feature.icon}</span>
              </div>

              <h1 className="text-xl font-bold">{feature.title}</h1>
              <div className="">
                <p className="text-gray-500 ">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GuestFeatures;
