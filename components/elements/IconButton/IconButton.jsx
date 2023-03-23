import React from "react";

const IconButton = ({ children, color, ...props }) => {
  const buttonColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-primary hover:bg-primary/80 text-white";
      case "error":
        return "bg-error hover:bg-error/80 text-white";
      case "warning":
        return "bg-warning hover:bg-warning/80 text-white";
      case "info":
        return "bg-info hover:bg-info/80 text-white";
      case "secondary":
        return "bg-secondary hover:bg-secondary/80 text-white";
      default:
        return "bg-primary hover:bg-primary/80 text-white";
    }
  };

  return (
    <button
      className={`inline-flex text-white font-semibold  border-0  items-center justify-center h-8 w-8 focus:outline-none  rounded-xl  ${buttonColorClasses()}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
