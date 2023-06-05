import { useState } from "react";
import axios from "axios";
import { useSelect } from "downshift";

import "./Search.css";

const getResults = (val) =>
  val.length && axios.get(`https://api.npms.io/v2/search/suggestions?q=${val}`);

export const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const itemToString = (item) => (item ? item.package.name : "");

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: suggestions,
    itemToString,
  });

  const onInputChange = async (val) => {
    setSearchVal(val);
    const results = await getResults(val);
    console.log(results.data);
    setSuggestions(results.data);
  };

  return (
    <>
      <input
        className="searchInput"
        type="search"
        value={searchVal}
        onChange={(e) => onInputChange(e.target.value)}
      />

      {/* {suggestions?.map((pkg) => (
        <p>{pkg.package.name}</p>
      ))} */}
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <div {...getToggleButtonProps()}>{selectedItem ?? "Elements"}</div>
        <ul {...getMenuProps()}>
          {isOpen &&
            suggestions.length > 0 &&
            suggestions.map((item, index) => {
              return (
                <li
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  key={`${item.package.name}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.package.name}
                </li>
              );
            })}
        </ul>
        <div tabIndex="0" />
      </div>
    </>
  );
};
