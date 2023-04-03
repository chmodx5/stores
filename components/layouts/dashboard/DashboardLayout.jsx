import { FaBars, FaUserAlt } from "react-icons/fa";
import { IconButton, Sidebar } from "./../../elements";
import React, { useContext, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { appUiContext } from "../../../store/appUiContext";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiLogin } from "react-icons/hi";
import { userContext } from "../../../store/userContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const storeSlug = useRouter().query.storeSlug;
  const { toggleSidebar } = useContext(appUiContext);

  return (
    <>
      {/* layout wrapper */}
      <div className="flex h-screen">
        {/* sidebar */}
        <Sidebar />
        {/* content and  navbar area */}
        <div className="flex-1 flex flex-col">
          {/* navbar */}
          {/* <header className="bg-yellow-300">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              toggle sidebar
            </button>
            navbar
          </header> */}
          {/* content */}

          <main className="flex-1 overflow-y-auto px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <div>
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
                <IconButton onClick={() => toggleSidebar()}>
                  <FaBars />
                </IconButton>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
