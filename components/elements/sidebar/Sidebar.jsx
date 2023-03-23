import React, { useContext } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { Logo } from "..";
import { useSelector } from "react-redux";

const Sidebar = ({ user, mini }) => {
  const { brandId } = useParams();
  const storeSlug = user?.store?.slug;
  return (
    <div
      className={`hidden sm:flex sm:flex-col md:flex-shrink-0 transition-all ease-in-out duration-300 px-4 py-4 overflow-auto ${
        mini ? "w-20" : "w-64"
      }`}
    >
      {/* app logo */}
      <Logo mini={mini} />

      {/* sidebar header (small section with the users name */}
      {!mini && <SidebarHeader user={user} />}
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
                  name: "Featured Products",
                  link: `/${storeSlug}/admin/featured-products`,
                },
                {
                  name: "Products",
                  link: `/${storeSlug}/admin/products`,
                  subItems: [
                    {
                      name: "products",
                      link: `/${storeSlug}/admin/products`,
                    },
                    {
                      name: "add product",
                      link: `/${storeSlug}/admin/products/create`,
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
                    {
                      name: "create category",
                      link: `/${storeSlug}/admin/categories/create`,
                    },
                  ],
                },
                {
                  name: "brands",
                  link: `/${storeSlug}/admin/brands`,
                  subItems: [
                    {
                      name: "brands",
                      link: `/${storeSlug}/admin/brands`,
                    },
                    {
                      name: "add brand",
                      link: `/${storeSlug}/admin/brands/create`,
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Sidebar;
