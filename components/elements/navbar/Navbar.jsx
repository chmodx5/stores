import React, { useContext } from "react";
import { IconButton, NavbarLink, Search, StoreLogo } from "..";
import { useRouter } from "next/router";
import { storeContext } from "../../../store/storeContext";
import { userContext } from "../../../store/userContext";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
import { HiLogin } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const storeSlug = useRouter().query.storeSlug;
  const { store } = useContext(storeContext);

  const { data: session, status } = useSession();

  const navbar_links = [
    {
      href: "/" + storeSlug,
      text: "Home",
    },
    {
      href: "/" + storeSlug + "/about",
      text: "About",
    },
  ];
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-md">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        {/* app logo */}

        <StoreLogo to={`/${storeSlug}`} />

        {/* search */}
        <div className="flex-1 ml-2">
          <Search />
        </div>

        {/* navbar links */}
        <div className="items-center justify-end flex  ">
          <ul className=" hidden md:flex ">
            {navbar_links.map((link, idx) => (
              <NavbarLink key={idx} href={link.href} text={link.text} />
            ))}
          </ul>
          <Menu as={"div"} className="relative inline-block text-left ">
            <Menu.Button as="div" className={"group"}>
              <IconButton className={"bg-white hover:bg-gray-200 "}>
                <FaUserAlt className="group-hover:scale-110 transition-all ease-in-out text-base text-gray-700" />
                {/* {status === "authenticated" && (
                  <span className="text-xs text-gray-700">
                    {session.user.name}
                  </span>
                )} */}
              </IconButton>
            </Menu.Button>
            <Menu.Items
              className={
                "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-2"
              }
            >
              {status === "authenticated" && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active && "bg-primary text-white"
                        } group flex items-center rounded-md px-2 py-2 text-sm`}
                        href={`/${storeSlug}/admin`}
                      >
                        <MdAdminPanelSettings />
                        <span className="ml-2">Admin </span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active && "bg-primary text-white"
                        } group flex items-center rounded-md px-2 py-2 text-sm`}
                        href={`/${storeSlug}/account`}
                      >
                        <CgProfile className="" />
                        <span className="ml-2">Account</span>
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}

              {status !== "authenticated" ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-primary text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signIn()}
                    >
                      <HiLogin className="rotate-180" />
                      <span className="ml-2">Sign In</span>
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-primary text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signOut()}
                    >
                      <HiLogin className="" />
                      <span className="ml-2">Sign out</span>
                    </button>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
