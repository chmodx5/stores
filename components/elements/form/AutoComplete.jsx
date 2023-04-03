import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import Card from "../cards/Card";

export default function AutoComplete({
  label,
  items,
  getSelected,
  error,
  ...props
}) {
  const [selected, setSelected] = useState({});
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((items) =>
          items.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className=" w-full">
      <h3 className={`font-semibold text-sm mb-2 ${error && "text-error"}`}>
        {label} - {error}
      </h3>

      {/* {meta.touched && meta.error ? <div>{meta.error}</div> : null} */}
      <Combobox
        value={selected}
        onChange={(e) => {
          getSelected(e);
          setSelected(e);
        }}
        {...props}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden ">
            <Combobox.Input
              className=""
              displayValue={(item) => item.name}

              // onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="">
              <Card
                className={
                  "absolute mt-2 max-h-60 w-full overflow-auto  z-50 bg-white"
                }
              >
                {filteredItems.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded-xl ${
                          active ? "bg-primary text-white" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-primary"
                              }`}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Card>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
