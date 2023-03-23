import React from "react";
import { Card } from "../../../elements";

const Cta = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 ">
          <Card classes={"py-8 "}>
            <div className="p-4">
              <Image alt="image" src={"/svg-images/delivery_truck.svg"} />
            </div>
            <div className="px-4">
              <p className="uppercase underline">special offer</p>
              <h3 className="text-2xl font-bold w-10/12">
                Get free delivery on laptops anywhere in Nairobi county and
                along Thika road
              </h3>
              <p className="mt-4 font-thin">
                Other areas we deliver to are Juja, Ruiru, Thika
              </p>
            </div>
          </Card>
        </div>
        <div className="col-span-8 flex flex-col space-y-4">
          <Card classes="h-1/2">side b top</Card>
          <Card classes="h-1/2">side b bottom lore</Card>
        </div>
      </div>
    </>
  );
};

export default Cta;
