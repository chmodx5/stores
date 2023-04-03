import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { Card } from "../../elements";
const SubSectionlayout = ({ pageTitle, children }) => {
  const [location, setLocation] = React.useState(null);
  const router = useRouter().asPath;

  React.useEffect(() => {
    setLocation(router);
  }, [router]);

  return (
    <div>
      <Card classes="px-4">
        <h1 className={`font-bold capitalize text-2xl mb-2`}>{pageTitle}</h1>
        <h3 className="flex">
          {location &&
            location
              .split("/")
              .slice(1)
              .map((item, idx) => (
                <div key={idx} className={`flex items-center`}>
                  <span className="capitalize">{item}</span>
                  {idx !== location.split("/").length - 2 && (
                    <span className="text-gray-500 text-xs mx-4">
                      <FaChevronRight />
                    </span>
                  )}
                </div>
              ))}
        </h3>
      </Card>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default SubSectionlayout;
