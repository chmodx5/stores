import React from "react";
import { Card } from "..";

const Alert = ({ children, variant }) => {
  //switch statement for different variants

  const buttonVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-success/20 text-success bg-opacity-20";

      case "error":
        return "bg-error/20 text-error bg-opacity-20";

      case "warning":
        return "bg-warning/20 text-warning bg-opacity-20";

      case "info":
        return "bg-info/20 text-info bg-opacity-20";

      case "primary":
        return "bg-primary/20 text-primary bg-opacity-20";

      case "secondary":
        return "bg-secondary/20 text-secondary bg-opacity-20";

      default:
        return "bg-success/20 text-success bg-opacity-20";
    }
  };

  return (
    <Card
      flat
      className={`${buttonVariantClasses()} bg-opacity-20 p-4 font-bold rounded-xl flex space-x-2`}
    >
      <div className="font-bold">{children}</div>
    </Card>
  );
};

export default Alert;
