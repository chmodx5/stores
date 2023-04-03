import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../store/userContext";
import { useRouter } from "next/router";

const AppWrapper = ({ children }) => {
  const { data: session } = useSession();
  const { user } = useContext(userContext);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      console.log("dark here");

      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const router = useRouter();

  return <>{children}</>;
};

export default AppWrapper;
