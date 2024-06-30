import React from "react";
import Input from "../Input/Input";
import { useGetRequest } from "../../hooks/useGetRequest";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import SearchBox from "./components/SearchBox/SearchBox";

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
  return (
    <header className="flex justify-between items-center px-4 shadow-md z-[410]">
      <div>
        <h1 className="text-2xl">Favorite Places</h1>
      </div>
      <div>
        <Input
          InputProps={{
            placeholder: "Search for places",
            onChange: handleSearch,
          }}
          className="lg:w-[500px]"
          slotProps={{
            dropdown: {
              isOpen: places.isSuccess && places?.data?.length > 0,
            },
          }}
          slots={{
            dropdown: () => {
              if (places.isSuccess) {
                return (
                  <div>
                    {places.data.map((place: any) => (
                      <SearchBox
                        key={place.place_id}
                        title={place.name}
                        description={place.display_name}
                      />
                    ))}
                  </div>
                );
              }
              return null;
            },
          }}
        />
      </div>
      <div></div>
    </header>
  );
};

export default Header;
