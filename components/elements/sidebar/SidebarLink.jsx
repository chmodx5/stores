import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarLink = ({ icon, href, children }) => {
  const router = useRouter();

  return (
    <div>
      <Link
        href={href}
        className={`w-full rounded-xl px-4 py-3 capitalize text-base font-medium hover:text-primary hover:bg-primary/20 group text-left text-gray-500 ${
          href == router.asPath ? "bg-primary/20 text-primary" : undefined
        } flex items-center space-x-2 ${!icon ? "" : ""}}`}
      >
        {icon && <span>{icon}</span>}

        <span className="">{children}</span>
      </Link>
    </div>
  );
};

export default SidebarLink;
