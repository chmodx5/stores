// import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";

const linkButtonClasses = `w-full rounded-xl px-4 py-3 capitalize text-base font-medium hover:text-primary hover:bg-primary/20 group text-left text-gray-500`;

export default function Example({ menuGroup }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="space-y-4">
      {menuGroup.map((group, idx) => (
        <div key={idx}>
          <h4 className="uppercase font-bold px-4 text-xs text-gray-600 mb-2">
            {group.name}
          </h4>
          <div className=" w-full text-right">
            {group.menuItems.map((item, idx) => (
              <div key={idx}>
                {/* check if subitems exists */}
                {!item.subItems ? (
                  <SidebarLink href={item.link}>{item.name}</SidebarLink>
                ) : (
                  <AppMenu item={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const AppMenu = ({ item }) => {
  const currentRoute = useRouter().asPath;

  const [isMenuOpen, setIsMenuOpen] = useState(
    currentRoute.split("/")[3] == item.subItems[0].link.split("/")[3]
      ? true
      : false
  );

  useEffect(() => {
    setIsMenuOpen(
      currentRoute.split("/")[3] == item.subItems[0].link.split("/")[3]
        ? true
        : false
    );
  }, [currentRoute]);

  console.log("menu open", isMenuOpen);

  return (
    <div>
      <ul className="relative list-none">
        <>
          <div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={` ${linkButtonClasses} flex justify-between`}
            >
              <span>{item.name}</span>

              <HiChevronDown
                className={`ml-2 -mr-1 h-5 w-5 text-gray-500 group-hover:text-primary -rotate-90 ${
                  isMenuOpen ? "rotate-0" : ""
                } transition-all`}
                aria-hidden="true"
              />
            </button>
          </div>
          {isMenuOpen && (
            <div className="transition-transform  duration-500 ease-in-out">
              <li className="list-none">
                <div className="px-1 py-1 ">
                  {item.subItems &&
                    item.subItems.map((item, idx) => (
                      <div key={idx} className="list-none">
                        <SidebarLink href={item.link} icon={<BsDot />}>
                          {item.name}
                        </SidebarLink>
                      </div>
                    ))}
                </div>
              </li>
            </div>
          )}
        </>
      </ul>
    </div>
  );
};
