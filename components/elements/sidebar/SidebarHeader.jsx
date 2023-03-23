import React from "react";
import { Avatar, Card } from "..";
import { useSelector } from "react-redux";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Card href={"/"} flat className={"bg-gray-100 flex space-x-4 p-4 mt-4"}>
      {/* avatar containing users profile image */}
      <div>
        <Avatar alt={"user avatart"} src={"/next.svg"} />
      </div>
      <div>
        {/* users name */}
        <h6 className="font-semibold text-base">{user?.name}</h6>
        {/* users role or just the word admin */}
        <p className="text-gray-500 text-sm">{user?.role}</p>
      </div>
    </Card>
  );
};

export default SidebarHeader;
