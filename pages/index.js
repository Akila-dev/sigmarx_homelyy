import Link from "next/link";
import Image from "next/image";

import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imgUrl,
}) => (
  <div className="flex flex-col md:flex-row md:justify-center items-start md:items-center text-black py-9 md:pb-7 lg:pt-10 lg:pb-8 gap-4 md:gap-7">
    <div className="md:w-[370px] lg:w-[440px] xl:w-[500px]">
      <Image
        src={imgUrl}
        width={500}
        height={350}
        alt="banner"
        className="object-cover object-top w-full"
      />
    </div>
    <div className="px-0">
      <p className="uppercase text-sm text-gray-600">{purpose}</p>
      <h2 className="font-bold mt-1 lg:mt-2 text-[1.7rem] lg:text-3xl">
        {title1}
      </h2>
      <h2 className="font-bold mb-2 lg:mb-4 lg:mt-1 text-[1.7rem] lg:text-3xl">
        {title2}
      </h2>
      <p className="lg:text-lg text-gray-600">{desc1}</p>
      <p className="lg:text-lg text-gray-600">{desc2}</p>
      <button className="mt-4 bg-white font-bold px-4 py-1 lg:text-lg rounded-md shadow">
        <Link href={linkName}>{buttonText}</Link>
      </button>
    </div>
  </div>
);

const Home = ({ propertiesForSale, propertiesForRent }) => {
  console.log(propertiesForSale);
  console.log(propertiesForRent);
  return (
    <div>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imgUrl="https://i.pinimg.com/564x/a7/d3/af/a7d3af50bb16c3ddfb2c3d67fa21602d.jpg"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Fetch properties and map over them */}
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-sale"
        imgUrl="https://i.pinimg.com/564x/b1/c7/5c/b1c75c45072ff60eb0e165fa08aed74b.jpg"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Fetch properties and map over them */}
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
