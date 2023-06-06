import React from "react";

const PackageItem = ({ item, index, getItemProps }) => {
  return (
    <li {...getItemProps({ item, index })} className="pb-1">
      <a
        href={`https://www.npmjs.com/package/${item.package.name}`}
        target="_blank"
        rel="noreferrer"
      >
        <h5>{item.package.name}</h5>
        <span className="text-sm text-gray-700">
          {item.package.description}
        </span>
      </a>
    </li>
  );
};

export default PackageItem;
