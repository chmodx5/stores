import React from "react";
import ImageContainer from "../imageContainer/ImageContainer";

const Avatar = ({ ...props }) => {
  return (
    <div className="relative w-10 aspect-square rounded-full ">
      <ImageContainer className="rounded-full" {...props} />
    </div>
  );
};

export default Avatar;
