import { BsFillTelephoneFill, BsInstagram } from "react-icons/bs";
import { AiOutlineCopyright } from "react-icons/ai";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div className="flex justify-center pb-10 pt-8">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-center text-3xl font-bold text-green-800">
          Homelyy Real Estate
        </h1>
        <h3 className="text-xl font-bold">
          <AiOutlineCopyright className="inline mr-2" />
          By Rhemarx Design
        </h3>
        <div className="flex justify-center items-center gap-5 text-xl font-bold">
          <a href="tel:+2349090411429">
            <BsFillTelephoneFill />
          </a>
          <a href="akilapanunayan@gmail.com">
            <SiGmail />
          </a>
          <a href="https://instagram.com/rhemarxdesign">
            <BsInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
