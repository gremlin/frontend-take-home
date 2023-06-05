import { useState } from "react";

import "./Search.css";

export const Search = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <input
      className="searchInput"
      type="search"
      value={searchVal}
      onChange={(e) => setSearchVal(e.target.value)}
    />
  );
};
