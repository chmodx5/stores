import React from "react";

const ImageContainer = ({ ...props }) => {
  return (
    <div className="relative aspect-square rounded-xl">
      <img
        className={`absolute object-cover
        object-center rounded-xl w-full h-full `}
        {...props}
      />
    </div>
  );
};

export default ImageContainer;
