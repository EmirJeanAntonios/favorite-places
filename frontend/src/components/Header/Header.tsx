import React, { useState } from "react";
import Input from "../Input/Input";
import { useGetRequest } from "../../hooks/useGetRequest";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import SearchBox from "./components/SearchBox/SearchBox";
import { IPlaceApiResponse } from "../../interfaces/IPlaceApiResponse";
import SearchIcon from "../../Icons/SearchIcon";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const places = useGetRequest({
    key: "places",
    url: "https://nominatim.openstreetmap.org/search?format=json",
    params: {
      q: query,
    },
    options: {
      enabled: true,
    },
  });
  const handleSearch = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value == "" || value.length < 3) {
        setIsDropdownOpen(false);
        return;
      }
      setQuery(e.target.value);
      setIsDropdownOpen(true);
    },
    500
  );
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 3 && places?.data?.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleBlur = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-4 shadow-md z-[410] bg-emerald-500">
      <div>
        <h1 className="text-2xl text-white">Favorite Places</h1>
      </div>
      <div>
        <Input
          InputProps={{
            placeholder: "Search for places",
            onChange: handleSearch,
            onFocus: handleFocus,
            onBlur: handleBlur,
          }}
          className="lg:w-[500px]"
          slots={{
            rightEndAdornment: <SearchIcon />,
          }}
        >
          <Input.DropDown isOpen={isDropdownOpen}>
            {places?.data?.map((place: IPlaceApiResponse, index: number) => (
              <SearchBox
                key={index}
                title={place.name}
                description={place.display_name}
                lat={place.lat}
                lon={place.lon}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            ))}
          </Input.DropDown>
        </Input>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
