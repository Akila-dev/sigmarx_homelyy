import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import noResult from "../assets/images/noresult.svg";

const Searchbar = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);

  const mobileSearchbar =
    "flex justify-center items-center fixed left-0 top-0 bg-[rgba(0,0,0,0.7)] h-screen w-full";

  useEffect(() => {
    if (searchInput !== "") {
      const fetchLocation = async () => {
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchInput}`
        );
        setLocationData(data?.hits);
      };
      fetchLocation();
    } else {
      setShowLocations(false);
    }
  }, [searchInput]);

  return (
    <div className="w-full text-lg flex items-center md:justify-center justify-end">
      <div
        className={`${
          showSearchbar ? mobileSearchbar : "hidden"
        } md:block md:relative md:w-full md:bg-transparent md:h-auto`}
        onClick={(e) => {
          if (e.target != document.getElementById("search")) {
            setShowSearchbar(false);
          }
        }}
      >
        <div className="w-full flex justify-center items-center relative px-5 md:px-0">
          <input
            id="search"
            value={searchInput}
            placeholder="Search Location"
            autoComplete="off"
            className="searchbar w-full md:bg-gray-100 rounded-3xl shadow-lg md:shadow-sm text-black placeholder-black lg:py-[6px] py-1 px-5 md:px-7 pr-[60px]"
            onChange={(e) => {
              setShowLocations(true);
              setSearchInput(e.target.value);
            }}
          />
          <button className="absolute right-[1.25rem] md:right-0 px-3 md:px-4 md:text-2xl h-full rounded-r-3xl bg-gray-100 border-l cursor-auto">
            <BiSearchAlt2 />
          </button>
          {showLocations ? (
            <div
              className="absolute md:flex md:justify-center md:fixed top-[100%] md:top-[60px] md:left-0 md:h-screen w-full px-5 md:px-0 pt-3 text-base"
              onClick={(e) => {
                if (e.target != document.getElementById("locations")) {
                  setShowLocations(false);
                }
              }}
            >
              <div
                id="locations"
                className="shadow-md max-h-[250px] md:w-[421px] lg:w-[566px] xl:w-[676px] bg-white rounded-lg px-3 md:ml-[85px] overflow-auto"
              >
                {locationData.length > 0 ? (
                  locationData?.map((location) => (
                    <p
                      key={location.id}
                      className="py-2 border-b cursor-pointer"
                      onClick={() => {
                        setSearchInput(location.name);
                        setShowLocations(false);
                      }}
                    >
                      <Link
                        href={`/search?locationExternalIDs=${location.externalID}`}
                      >
                        {location.name}
                      </Link>
                    </p>
                  ))
                ) : (
                  <div className="flex flex-col gap-4 justify-center items-center py-5">
                    <Image alt="no result" src={noResult} className="w-full" />
                    <p className="text-xl font-bold text-center">
                      Oops... No Results Found
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <button
        className="md:hidden text-white text-md bg-green-700 p-2 rounded-full"
        onClick={() => setShowSearchbar(true)}
      >
        <BiSearchAlt2 />
      </button>
    </div>
  );
};

export default Searchbar;
