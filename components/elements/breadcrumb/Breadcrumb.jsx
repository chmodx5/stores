import { useRouter } from "next/router";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = () => {
  const location = useRouter();

  return (
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
  );
};

export default Breadcrumb;
