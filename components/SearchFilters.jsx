import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    console.log(filterValues);
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };
  return (
    <div className="flex justify-center flex-wrap gap-3 py-3 px-2md:px-5">
      {filters.map((filter) => (
        <div key={filter.queryName}>
          <select
            placeholder={filter.placeholder}
            name={filter.queryName}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            className="w-fit py-2 px-3 bg-gray-100 shadow-sm rounded-lg border-r-[10px] border-gray-100 capitalize"
          >
            <option value="" className="text-center">
              {filter.queryName}
            </option>
            {filter?.items?.map((item) => (
              <option
                key={item.value}
                name={item.name}
                value={item.value}
                className="py-2"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SearchFilters;
