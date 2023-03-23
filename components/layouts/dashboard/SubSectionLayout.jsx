import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";

const SubSectionlayout = ({ pageTitle }) => {
  const location = useLocation();
  return (
    <div>
      <div className="px-4">
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
      </div>
      <Outlet />
    </div>
  );
};

export default SubSectionlayout;
