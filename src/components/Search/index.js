import { useState } from "react";
import axios from "axios";
import { useCombobox } from "downshift";

import "./Search.css";

const getResults = (val) =>
  val.length && axios.get(`https://api.npms.io/v2/search/suggestions?q=${val}`);

export const Search = () => {
  const [suggestions, setSuggestions] = useState([]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    async onInputValueChange({ inputValue }) {
      if (inputValue.length) {
        const results = await getResults(inputValue);
        setSuggestions(results.data);
      }
    },
    items: suggestions,
    itemToString(item) {
      return item ? item.package.name : "";
    },
  });

  return (
    <div>
      <div className="w-72 flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps()}>
          NPM Package Search
        </label>
        <div className="flex shadow-sm bg-white gap-0.5">
          <input
            placeholder="Search"
            className="w-full p-1.5 searchInput"
            {...getInputProps()}
          />
          <button
            aria-label="clear selection"
            className="px-2"
            type="button"
            onClick={() => {
              setSuggestions([]);
            }}
            tabIndex={-1}
          >
            &#215;
          </button>
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
          !(isOpen && suggestions.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          suggestions.length > 0 &&
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
    </div>
  );
};
