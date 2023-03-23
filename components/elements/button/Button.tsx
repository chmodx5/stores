import React from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface Props {
  block?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  block = false,
  isLoading = false,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={`${
        block ? "flex w-full items-center " : "inline-flex items-center"
      } text-white justify-center space-x-2 font-semibold bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary/80 rounded-xl text-base`}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </button>
  );
};

export default Button;
