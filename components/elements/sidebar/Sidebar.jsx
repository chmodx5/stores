import React, { useContext } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { Logo } from "..";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { appUiContext } from "../../../store/appUiContext";

const Sidebar = ({ user, mini }) => {
  const { data: session, status } = useSession();
  const { sidebarOpen } = useContext(appUiContext);

  const storeSlug = useRouter().query.storeSlug;
  return (
    <>
      {!!sidebarOpen && (
        <div
          className={`hidden sm:flex sm:flex-col md:flex-shrink-0 transition-all ease-in-out duration-300 px-4 py-4 overflow-auto ${
            mini ? "w-20" : "w-64"
          }`}
        >
          {/* app logo */}
          <Logo mini={mini} />

          {/* sidebar header (small section with the users name */}
          {!mini && <SidebarHeader />}
          {/* sidebar menu items */}
          <div className="mt-4">
            <SidebarMenu
              menuGroup={[
                {
                  name: "Management",
                  menuItems: [
                    {
                      name: "Dashboard",
                      link: `/${storeSlug}/admin`,
                    },

                    {
                      name: "Pages",
                      link: `/${storeSlug}/admin/pages`,
                      subItems: [
                        {
                          name: "Home Page",
                          link: `/${storeSlug}/admin/pages/home`,
                        },
                        {
                          name: "About Page",
                          link: `/${storeSlug}/admin/pages/about`,
                        },
                      ],
                    },
                    {
                      name: "Products",
                      link: `/${storeSlug}/admin/products`,
                      subItems: [
                        {
                          name: "products",
                          link: `/${storeSlug}/admin/products`,
                        },
                        // {
                        //   name: "analytics",
                        //   link: `/${storeSlug}/admin/products/analytics`,
                        // },
                        {
                          name: "add product",
                          link: `/${storeSlug}/admin/products/add`,
                        },
                      ],
                    },
                    {
                      name: "categories",
                      link: `/${storeSlug}/admin/categories`,
                      subItems: [
                        {
                          name: "categories",
                          link: `/${storeSlug}/admin/categories`,
                        },
                        // {
                        //   name: "analytics",
                        //   link: `/${storeSlug}/admin/categories/analytics`,
                        // },
                        {
                          name: "create category",
                          link: `/${storeSlug}/admin/categories/add`,
                        },
                      ],
                    },
                    {
                      name: "brands",
                      link: `/${storeSlug}/admin`,
                      subItems: [
                        {
                          name: "brands",
                          link: `/${storeSlug}/admin/brands`,
                        },
                        // {
                        //   name: "analytics",
                        //   link: `/${storeSlug}/admin/brands/analytics`,
                        // },
                        {
                          name: "add brand",
                          link: `/${storeSlug}/admin/brands/add`,
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
