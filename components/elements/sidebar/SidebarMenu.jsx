// import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

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
                  <Link
                    to={item.link}
                    className={({ isActive }) =>
                      `${linkButtonClasses} ${"block"} ${
                        isActive
                          ? "bg-primary/20 block text-primary"
                          : undefined
                      }`
                    }
                    end
                  >
                    {item.name}
                  </Link>
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
  const currentRoute = useLocation().pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(
    currentRoute.split("/")[3] == item.subItems[0].link.split("/")[3]
      ? true
      : false
  );

  return (
    <div>
      <li className="relative list-none">
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
                        <NavLink
                          to={item.link}
                          className={({ isActive }) =>
                            `${linkButtonClasses} ${
                              isActive
                                ? "bg-primary/20 text-primary"
                                : undefined
                            } flex items-center space-x-4`
                          }
                          end
                        >
                          <BsDot />
                          {item.name}
                        </NavLink>
                      </div>
                    ))}
                </div>
              </li>
            </div>
          )}
        </>
      </li>
    </div>
  );
};
