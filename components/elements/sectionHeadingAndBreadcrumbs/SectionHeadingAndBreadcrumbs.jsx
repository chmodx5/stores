import React from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { FaChevronRight } from "react-icons/fa";

const SectionHeadingAndBreadcrumbs = ({ sectionTitle, pageTitle }) => {
  return (
    <>
      <div className="mb-8">
        <h1 className={`font-bold capitalize text-2xl mb-4`}>{sectionTitle}</h1>
        <Breadcrumb />
      </div>
      {/* <div className="px-4">
        <h1 className={`font-bold capitalize text-2xl mb-4`}>{pageTitle}</h1>
        <h3 className="flex">
          {location.pathname
            .split("/")
            .slice(1)
            .map((item, idx) => (
              <div key={idx} className={`flex items-center`}>
                <span className="capitalize">{item}</span>
                {idx !== location.pathname.split("/").length - 2 && (
                  <span className="text-gray-500 text-xs mx-4">
                    <FaChevronRight />
                  </span>
                )}
              </div>
            ))}
        </h3>
      </div> */}
    </>
  );
};

export default SectionHeadingAndBreadcrumbs;
