import React from "react";

interface SearchBoxProps {
  title: string;
  description: string;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <div className="px-2 flex flex-col">
      <div className="border-gray-300">
        <h2 className="text-md">{props.title}</h2>
      </div>
      <div className="pb-1  border-b border-gray-300">
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
};

export default SearchBox;
