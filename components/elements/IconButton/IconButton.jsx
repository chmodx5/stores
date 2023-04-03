import React from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const IconButton = ({ isLoading, children, className, color, ...props }) => {
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
      className={`inline-flex text-white font-semibold  border-0  items-center justify-center h-10 w-10 focus:outline-none  rounded-full  ${buttonColorClasses()} ${className}`}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : <span>{children}</span>}
    </button>
  );
};

export default IconButton;
