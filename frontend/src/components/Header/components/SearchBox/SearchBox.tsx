import React, { useEffect } from "react";
import { useLocationStore } from "../../../../stores/useLocationStore";

interface SearchBoxProps {
  title: string;
  description: string;
  lat: string;
  lon: string;
}

const SearchBox = (props: SearchBoxProps) => {
  const { setLat, setLon } = useLocationStore();
  const handleLatLonChange = () => {
    setLat(Number(props.lat));
    setLon(Number(props.lon));
  };
  return (
    <div className="px-2 flex flex-col cursor-pointer hover:shadow-sm" onClick={handleLatLonChange}>
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
