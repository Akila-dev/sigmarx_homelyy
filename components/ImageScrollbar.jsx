import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center mr-1">
      <button onClick={() => scrollPrev()} className="cursor-pointer text-2xl">
        <FaArrowAltCircleLeft />
      </button>
    </div>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <div className="flex justify-center items-center ml-1">
      <button onClick={() => scrollNext()} className="cursor-pointer text-2xl">
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};

const ImageScrollbar = ({ data }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;

    if (width <= 700) {
      setIsLargeScreen(false);
    }
  }, []);

  return (
    <div className="relative xl:w-[1000px] lg:w-[897px] md:w-[697px] w-full mx-auto py-5">
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        style={{ overflow: "hidden" }}
      >
        {data.map((item) => (
          <div
            className="xl:w-[950px] lg:w-[850px] md:w-[650px] sm:w-[230px] w-[200px] overflow-hidden p-1 object-cover"
            itemID={item.id}
            key={item.id}
          >
            <Image
              alt="property"
              placeholder="blur"
              blurDataURL={item.url}
              src={item.url}
              width="1000"
              height={isLargeScreen ? "500" : "1000"}
              className="object-cover"
            />
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default ImageScrollbar;
