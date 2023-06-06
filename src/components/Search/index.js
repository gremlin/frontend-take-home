import { useEffect, useState } from "react";
import axios from "axios";
import { useCombobox } from "downshift";

import { Settings } from "../Settings";
import PackageItem from "../PackageItem";
import Loader from "../Loader";

// Fetch results from NPM API
const getResults = (val) =>
  val.length && axios.get(`https://api.npms.io/v2/search/suggestions?q=${val}`);

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    if (!throwError) {
      setErrorMsg("");
    }
  }, [throwError]);

  const onInputChange = async (val) => {
    if (throwError) {
      return setErrorMsg("Testing Error Messages");
    } else {
      if (val.length) {
        setIsLoading(true);

        // Get results from API, otherwise, display error message.
        try {
          const results = await getResults(val);
          setSuggestions(results.data);
          setIsLoading(false);
        } catch (e) {
          setErrorMsg(e.message);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setSuggestions([]);
      }
    }
  };

  // downshift setup
  const { getLabelProps, getMenuProps, getInputProps, getItemProps } =
    useCombobox({
      onInputValueChange({ inputValue }) {
        onInputChange(inputValue);
      },
      items: suggestions,
      itemToString(item) {
        return item ? item.package.name : "";
      },
    });

  return (
    <div className="w-4/5 mx-auto pt-6 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-lg font-bold" {...getLabelProps()}>
          NPM Package Search
        </label>

        <Settings throwError={throwError} setThrowError={setThrowError} />
      </div>

      <div className="relative inline-block text-left">
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

        <ul
          className={`px-3 absolute w-full bg-white shadow-md max-h-80 overflow-scroll p-0 ${
            !suggestions.length && "hidden"
          }`}
          {...getMenuProps()}
        >
          {suggestions.length > 0 &&
            !errorMsg &&
            !isLoading &&
            suggestions.map((item, index) => {
              return (
                <PackageItem
                  key={`${item.value}${index}`}
                  item={item}
                  index={index}
                  getItemProps={getItemProps}
                />
              );
            })}
          {isLoading && <p>...</p>}
        </ul>
      </div>

      {isLoading && suggestions.length === 0 && <Loader />}

      <>
        {errorMsg && (
          <p className="bg-red-200 text-red-700 text-lg py-3 px-2">
            {errorMsg}
          </p>
        )}
      </>
    </div>
  );
};

export default Search;
