import React, { useEffect } from "react";
import AutoComplete from "../form/AutoComplete";
import { Button, IconButton } from "./..";

import { Fragment, useState } from "react";
// import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import Card from "../cards/Card";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const Search = () => {
  const [items, setItems] = React.useState([]);
  const [searchString, setSearchString] = React.useState("");
  const [inputFocussed, setInputFocussed] = React.useState(false);
  const storeSlug = useRouter().query.storeSlug;
  const [selected, setSelected] = useState({});

  const router = useRouter();

  let searchQuery = {
    searchString: searchString,
    storeSlug,
  };

  // console.log(items);
  useEffect(() => {
    if (searchString && searchString.length > 2) {
      fetch(`/api/autocomplete?q=${searchString}`).then((res) => {
        res.json().then((data) => {
          // console.log(data);
          setItems(data.items);
        });
      });
    }
  }, [searchString]);
  // console.log(searchString);
  // const getAutocompleteData = useAutocompleteQuery(searchQuery);

  // React.useEffect(() => {
  //   if (getAutocompleteData.isSuccess) {
  //     setItems(getAutocompleteData.data.items);
  //   }
  // }, [getAutocompleteData.isSuccess, getAutocompleteData.data]);

  // React.useEffect(() => {
  //   getAutocompleteData.refetch();
  // }, [searchString]);

  // console.log(getAutocompleteData.data);

  function handleSearchInput(e) {
    e.preventDefault();
    router.push(
      `/${storeSlug}/products?q=${searchString.replaceAll(" ", "-")}`
    );
  }

  return (
    <div>
      <form onSubmit={handleSearchInput} className="relative">
        <div className="flex space-x-2">
          <input
            onFocus={() => setInputFocussed(true)}
            // onBlur={() => {
            //   setTimeout(() => {
            //     setInputFocussed(false);
            //   }, 200);
            // }}
            type="search"
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <div>
            <IconButton type="submit">
              <FaSearch />
            </IconButton>
          </div>
        </div>

        {/* <Card>
          <ul>
            {items?.length > 0 ? (
              <>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="py-1 hover:bg-primary px-2 rounded-xl hover:text-white
                "
                  >
                    <button onClick={() => console.log(item.name)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </>
            ) : (
              <li className="py-1 px-2">No results found</li>
            )}
          </ul>
        </Card> */}

        {inputFocussed && (
          <div classes="absolute w-full h-96 overflow-y-auto px-4 bg-white">
            <ul className="z-20">
              {items?.length > 0 ? (
                <>
                  {items.map((item) => (
                    <Link
                      onClick={() => {
                        setInputFocussed(false);
                        setSearchString(item.name);
                      }}
                      href={`/${storeSlug}/products?q=${item.name.replaceAll(
                        " ",
                        "-"
                      )}`}
                      key={item.id}
                      className="py-1 hover:bg-primary px-2 rounded-xl hover:text-white
                "
                    >
                      <button>{item.name}</button>
                    </Link>
                  ))}
                </>
              ) : (
                <li className="py-1 px-2">No results found</li>
              )}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
