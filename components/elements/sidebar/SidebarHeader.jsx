import React from "react";
import { Avatar, Card } from "..";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const SidebarHeader = ({}) => {
  const { data: session, status } = useSession();

  return (
    <Card href={"/"} classes={" flex space-x-4 p-4 mt-4"}>
      {/* avatar containing users profile image */}
      <div>
        <Avatar alt={"user avatart"} src={session?.user.image} />
      </div>
      <div>
        {/* users name */}
        <h6 className="font-semibold text-base">{session?.user.name}</h6>
        {/* users role or just the word admin */}
        <p className="text-gray-500 text-sm">Admin</p>
      </div>
    </Card>
  );
};

export default SidebarHeader;
