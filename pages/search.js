import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/dist/client/image";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noResult from "../assets/images/noresult.svg";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <div className="pt-5">
      <div className="flex flex-col cursor-pointer text-lg py-2 justify-center bg-white rounded-lg shadow-sm">
        <button
          className="capitalize font-bold text-2xl hover:text-green-700"
          onClick={() => setSearchFilters((prev) => !prev)}
        >
          Search Properties By filters <BsFilter className="inline" />
        </button>
        {searchFilters && (
          <div className="">
            <SearchFilters />
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold py-4">
        Properties {router.query.purpose}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Fetch properties and map over them */}
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center min-h-[50vh]">
          <Image alt="no result" src={noResult} className="w-full" />
          <p className="text-2xl font-bold text-center">
            Oops... No Results Found
          </p>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&areaMax=${areaMax}&sort=${sort}&categoryExternalID=${categoryExternalID}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
