import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  PropertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <div className="max-w-[1000px] mx-auto">
    {photos && <ImageScrollbar data={photos} />}
    <div className="w-full md:px-7">
      <div className="w-full pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center py-3">
            <div className="pr-1 text-green-700">
              {isVerified && <GoVerified />}
            </div>
            <p className="font-bold truncate w-[200px] md:w-[150px] xl:w-[250px]">
              AED {millify(price)}
              <span className="">{rentFrequency && ` (${rentFrequency})`}</span>
            </p>
          </div>
          <div className="py-1 xl:py-2">
            <Image
              src={agency?.logo?.url}
              alt="agency logo"
              width={40}
              height={40}
              className="object-cover rounded-full border shadow-sm"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full lg:w-[250px] text-gray-500 pb-2 xl:pb-3">
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </div>
        <div className="mt-2">
          <p className="w-full text-xl font-bold mb-4 leading-8">{title}</p>
          <p className="text-gray-600 leading-8 text-justify">{description}</p>
        </div>
        <div className="flex flex-wrap uppercase justify-between my-5">
          <div className="flex justify-between w-[400px] border-b border-gray-100 py-3 gap-4">
            <p>Type:</p>
            <p className="font-bold">{type}</p>
          </div>
          <div className="flex justify-between w-[400px] border-b border-gray-100 py-3 gap-4">
            <p>Purpose:</p>
            <p className="font-bold">{purpose}</p>
          </div>
          {furnishingStatus && (
            <div className="flex justify-between w-[400px] border-b border-gray-100 py-3 gap-4">
              <p>Furnishing Status:</p>
              <p className="font-bold">{furnishingStatus}</p>
            </div>
          )}
        </div>
        <div>
          {amenities.length && <p className="text-2xl font-bold">Amenities</p>}
          <div className="flex flex-wrap py-3">
            {amenities.map((item) =>
              item.amenities.map((amenity) => (
                <p
                  key={amenity.text}
                  className="font-semibold text-g p-2 mr-2 my-1 bg-white text-gray-500 rounded-lg"
                >
                  {amenity.text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      PropertyDetails: data,
    },
  };
}

export default PropertyDetails;
