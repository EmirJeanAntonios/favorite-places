import React, { useMemo } from "react";
import Input from "../Input/Input";
import { useGetRequest } from "../../hooks/useGetRequest";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import SearchBox from "./components/SearchBox/SearchBox";
import { IPlaceApiResponse } from "../../interfaces/IPlaceApiResponse";

const Header = () => {
  const [query, setQuery] = React.useState("");
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
      setQuery(e.target.value);
    },
    500
  );

  const isDropdownOpen = useMemo(
    () => places.isSuccess && places?.data?.length > 0,
    [places.isSuccess, places?.data]
  );
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
          }}
          className="lg:w-[500px]"
          slots={{
            rightEndAdornment: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            ),
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
