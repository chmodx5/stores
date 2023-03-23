import Link from "next/link";
import React from "react";

//type props for mini , its a boolean
interface Props {
  mini?: boolean;
}

const Logo = ({ mini = false }: Props) => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <div className="relative w-8 aspect-square rounded-full bg-center">
          <img
            src="/logo.svg"
            alt="logo"
            className=" bg-center w-full h-full"
          />
        </div>
        {!mini && (
          <h3 className="font-bold text-lg hover:text-primary">Maduka</h3>
        )}
      </div>
    </Link>
  );
};

export default Logo;
