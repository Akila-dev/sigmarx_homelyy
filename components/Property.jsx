import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import DefaultImage from "../assets/images/img1.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    agency,
    isVerified,
    externalID,
    area,
  },
}) => (
  <Link href={`/property/${externalID}`} className="text-black">
    <div className="flex flex-wrap w-full justify-start cursor-pointer bg-white rounded-lg shadow-md">
      <div className="w-full">
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          alt="house"
          width={800}
          height={500}
          className="w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full px-3 xl:px-5 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center py-3">
            <div className="pr-1 text-green-700">
              {isVerified && <GoVerified />}
            </div>
            <p className="font-bold truncate w-[200px] md:w-[150px] xl:w-[250px]">
              AED {millify(price)}
              <span className="text-green">
                {rentFrequency && ` (${rentFrequency})`}
              </span>
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
        <p className="w-full lg:w-[250px] truncate">{title}</p>
      </div>
    </div>
  </Link>
);

export default Property;
