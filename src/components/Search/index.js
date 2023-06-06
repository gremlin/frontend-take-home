import { useState } from "react";
import axios from "axios";
import { useCombobox } from "downshift";

import "./Search.css";

const getResults = (val) =>
  val.length && axios.get(`https://api.npms.io/v2/search/suggestions?q=${val}`);

export const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
    useCombobox({
      async onInputValueChange({ inputValue }) {
        if (inputValue.length) {
          setIsLoading(true);

          // Get results from API, otherwise, display error message.
          try {
            const results = await getResults(inputValue);
            setSuggestions(results.data);
            setIsLoading(false);
          } catch (e) {
            console.log(e.message);
            setErrorMsg(e.message);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      },
      items: suggestions,
      itemToString(item) {
        return item ? item.package.name : "";
      },
    });

  return (
    <div>
      <div className="w-4/5 mx-auto flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps()}>
          NPM Package Search
        </label>

        <div className="mb-3">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-gray-100 bg-clip-padding px-3 py-3 text-sm font-mono leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search packages"
              aria-label="Search"
              {...getInputProps()}
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-gray-800 px-6 py-2.5 font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              aria-label="search"
              onClick={() => {
                setSuggestions([]);
              }}
              tabIndex={-1}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div class="flex items-center justify-center min-h-screen">
          <div
            style={{ borderTopColor: "transparent" }}
            class="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
          ></div>
          <p class="ml-2">Loading...</p>
        </div>
      ) : (
        <>
          <p>{errorMsg}</p>
          <ul
            className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
              !(isOpen && suggestions.length) && "hidden"
            }`}
            {...getMenuProps()}
          >
            {isOpen &&
              suggestions.length > 0 &&
              !errorMsg &&
              suggestions.map((item, index) => {
                return (
                  <li
                    key={`${item.value}${index}`}
                    {...getItemProps({ item, index })}
                  >
                    <span>{item.package.name}</span>
                    <span className="text-sm text-gray-700">
                      {item.package.description}
                    </span>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};
