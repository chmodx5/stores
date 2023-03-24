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
    <div className="md:w-96 mx-auto">
      <form onSubmit={handleSearchInput} className="relative">
        <div className="flex space-x-1">
          <input
            onFocus={() => setInputFocussed(true)}
            onBlur={() => {
              setTimeout(() => {
                setInputFocussed(false);
              }, 200);
            }}
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

        {inputFocussed && (
          <Card classes="absolute  h-44 overflow-y-scroll z-10 px-4 bg-white">
            <ul className="z-20 space-y-2">
              {items?.length > 0 ? (
                <>
                  {items.map((item, idx) => (
                    <div key={idx}>
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
                        className=" rounded bg-opacity-20 hover:bg-primary/20 block text-xs text-left"
                      >
                        <button className="text-left">{item.name}</button>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <li className="py-1 px-2">No results found</li>
              )}
            </ul>
          </Card>
        )}
      </form>
    </div>
  );
};

export default Search;
