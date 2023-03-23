import React from "react";

const Chip = ({ variant, children }) => {
  const chipClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary  text-primary";
      case "secondary":
        return "bg-secondary  text-secondary";
      case "success":
        return "bg-success  text-success";
      case "danger":
        return "bg-danger  text-danger";
      case "warning":
        return "bg-warning  text-warning";
      case "info":
        return "bg-info  text-info";
      case "light":
        return "bg-light  text-light";
      case "dark":
        return "bg-dark  text-dark";
      default:
        return "bg-primary  text";
    }
  };

  return (
    <div
      className={
        `bg-opacity-20 font-semibold px-4 inline-block rounded-lg` +
        " " +
        chipClasses()
      }
    >
      {children}
    </div>
  );
};

export default Chip;
