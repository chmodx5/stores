import React from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface Props {
  block?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "accent";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline" | "link";
  pill?: boolean;
}

const Button = ({
  block = false,
  isLoading = false,
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  pill = false,
  ...props
}: Props) => {
  const buttonSizes = () => {
    switch (size) {
      case "xs":
        return "px-4 h-6 text-xs";
      case "sm":
        return "px-5 h-8 text-sm";
      case "md":
        return "px-6 h-10 text-base ";
      case "lg":
        return "px-7 h-12 text-lg ";
      case "xl":
        return "px-8 h-14 text-xl ";
      default:
        return "px-4 h-12 text-base ";
    }
  };

  const buttonVariants = () => {
    switch (variant) {
      case "solid":
        switch (color) {
          case "primary":
            return "bg-primary text-primary-contrastText hover:bg-primary-hover border-primary dark:bg-primary-dark dark:text-primary-dark-contrastText dark:hover:bg-primary-dark-hover dark:border-primary-dark";
          case "secondary":
            return "bg-secondary text-secondary-contrastText hover:bg-secondary-hover border-secondary dark:bg-secondary-dark dark:text-secondary-dark-contrastText dark:hover:bg-secondary-dark-hover dark:border-secondary-dark";
          case "error":
            return "bg-error text-error-contrastText hover:bg-error-hover border-error dark:bg-error-dark dark:text-error-dark-contrastText dark:hover:bg-error-dark-hover dark:border-error-dark";
          case "warning":
            return "bg-warning text-warning-contrastText hover:bg-warning-hover border-warning dark:bg-warning-dark dark:text-warning-dark-contrastText dark:hover:bg-warning-dark-hover dark:border-warning-dark";
          case "info":
            return "bg-info text-info-contrastText hover:bg-info-hover border-info dark:bg-info-dark dark:text-info-dark-contrastText dark:hover:bg-info-dark-hover dark:border-info-dark";
          case "success":
            return "bg-success text-success-contrastText hover:bg-success-hover border-success dark:bg-success-dark dark:text-success-dark-contrastText dark:hover:bg-success-dark-hover dark:border-success-dark";
          case "accent":
            return "bg-accent text-accent-contrastText hover:bg-accent-hover border-accent dark:bg-accent-dark dark:text-accent-dark-contrastText dark:hover:bg-accent-dark-hover dark:border-accent-dark";
          default:
            return "bg-primary text-primary-contrastText hover:bg-primary-hover border-primary dark:bg-primary-dark dark:text-primary-dark-contrastText dark:hover:bg-primary-dark-hover dark:border-primary-dark";
        }
      case "outline":
        switch (color) {
          case "primary":
            return "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-contrastText dark:bg-transparent dark:text-primary-dark dark:border-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-dark-contrastText";
          case "secondary":
            return "bg-transparent text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-contrastText dark:bg-transparent dark:text-secondary-dark dark:border-secondary-dark dark:hover:bg-secondary-dark dark:hover:text-secondary-dark-contrastText";
          case "error":
            return "bg-transparent text-error border-2 border-error hover:bg-error hover:text-error-contrastText dark:bg-transparent dark:text-error-dark dark:border-error-dark dark:hover:bg-error-dark dark:hover:text-error-dark-contrastText";
          case "warning":
            return "bg-transparent text-warning border-2 border-warning hover:bg-warning hover:text-warning-contrastText dark:bg-transparent dark:text-warning-dark dark:border-warning-dark dark:hover:bg-warning-dark dark:hover:text-warning-dark-contrastText";
          case "info":
            return "bg-transparent text-info border-2 border-info hover:bg-info hover:text-info-contrastText dark:bg-transparent dark:text-info-dark dark:border-info-dark dark:hover:bg-info-dark dark:hover:text-info-dark-contrastText";
          case "success":
            return "bg-transparent text-success border-2 border-success hover:bg-success hover:text-success-contrastText dark:bg-transparent dark:text-success-dark dark:border-success-dark dark:hover:bg-success-dark dark:hover:text-success-dark-contrastText";
          case "accent":
            return "bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-accent-contrastText dark:bg-transparent dark:text-accent-dark dark:border-accent-dark dark:hover:bg-accent-dark dark:hover:text-accent-dark-contrastText";
          default:
            return "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-contrastText dark:bg-transparent dark:text-primary-dark dark:border-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-dark-contrastText";
        }
      case "link":
        switch (color) {
          case "primary":
            return "bg-primary/20 text-primary border-transparent hover:bg-primary hover:text-primary-contrastText dark:bg-transparent dark:text-primary-dark dark:border-transparent dark:hover:bg-primary-dark dark:hover:text-primary-dark-contrastText";
          case "secondary":
            return "bg-secondary/20 text-secondary border-transparent hover:bg-secondary hover:text-secondary-contrastText dark:bg-transparent dark:text-secondary-dark dark:border-transparent dark:hover:bg-secondary-dark dark:hover:text-secondary-dark-contrastText";
          case "error":
            return "bg-error/20 text-error border-transparent hover:bg-error hover:text-error-contrastText dark:bg-transparent dark:text-error-dark dark:border-transparent dark:hover:bg-error-dark dark:hover:text-error-dark-contrastText";
          case "warning":
            return "bg-warning/20 text-warning border-transparent hover:bg-warning hover:text-warning-contrastText dark:bg-transparent dark:text-warning-dark dark:border-transparent dark:hover:bg-warning-dark dark:hover:text-warning-dark-contrastText";
          case "info":
            return "bg-info/20 text-info border-transparent hover:bg-info hover:text-info-contrastText dark:bg-transparent dark:text-info-dark dark:border-transparent dark:hover:bg-info-dark dark:hover:text-info-dark-contrastText";
          case "success":
            return "bg-success/20 text-success border-transparent hover:bg-success hover:text-success-contrastText dark:bg-transparent dark:text-success-dark dark:border-transparent dark:hover:bg-success-dark dark:hover:text-success-dark-contrastText";
          case "accent":
            return "bg-accent/20 text-accent border-transparent hover:bg-accent hover:text-accent-contrastText dark:bg-transparent dark:text-accent-dark dark:border-transparent dark:hover:bg-accent-dark dark:hover:text-accent-dark-contrastText";
          default:
            return "bg-primary/20 text-primary border-transparent hover:bg-primary hover:text-primary-contrastText dark:bg-transparent dark:text-primary-dark dark:border-transparent dark:hover:bg-primary-dark dark:hover:text-primary-dark-contrastText";
        }
    }
  };

  return (
    <button
      className={` ${pill ? "rounded-full" : "rounded-xl"} ${
        block
          ? "flex w-full items-center justify-center"
          : "inline-flex items-center justify-center"
      }  ${buttonSizes() + " " + buttonVariants()}`}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </button>
  );
};

export default Button;
