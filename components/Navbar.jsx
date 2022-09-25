import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const activeLink = "text-green-700";
  const inactiveLink = "hover:text-green-700";

  return (
    <div className="flex justify-between items-center lg:relative gap-2 md:gap-12 lg:gap-20">
      <div className="text-[1.7rem] font-bold text-green-700">
        <Link href="/" className="pl-2">
          Homelyy
        </Link>
      </div>
      <div className="w-full md:w-[445px] lg:w-[590px] xl:w-[700px]">
        <Searchbar />
      </div>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="lg:text-3xl text-3xl text-black font-bold"
      >
        <FcMenu className="text-green-700" />
      </button>
      {showMenu && (
        <div className="fixed lg:absolute h-screen lg:h-auto top-0 lg:top-[70px] right-0 w-[250px] lg:w-auto px-5 lg:px-7 lg:py-3 rounded bg-white shadow-md text-lg">
          <div className="lg:hidden h-[80px] px-0 md:px-5 text-2xl w-full flex text-right items-center justify-end">
            <p>
              <IoMdClose onClick={() => setShowMenu(false)} />
            </p>
          </div>
          <Link href="/">
            <p className="border-y lg:border-t-0 px-1 py-3 lg:py-4 tracking-wider flex items-center gap-2 cursor-pointer">
              <FcHome />
              <span
                className={router.pathname === "/" ? activeLink : inactiveLink}
              >
                Home
              </span>
            </p>
          </Link>
          <Link href="/search">
            <p className="border-b px-1 py-3 lg:py-4 tracking-wider flex items-center gap-2 cursor-pointer">
              <BsSearch />
              <span
                className={
                  router.pathname === "/search" ? activeLink : inactiveLink
                }
              >
                All Properties
              </span>
            </p>
          </Link>
          <Link href="/search?purpose=for-sale">
            <p className="border-b px-1 py-3 lg:py-4 tracking-wider flex items-center gap-2 cursor-pointer">
              <FiKey />
              <span
                className={
                  router.pathname === "/search?purpose=for-sale"
                    ? activeLink
                    : inactiveLink
                }
              >
                Buy Property
              </span>
            </p>
          </Link>
          <Link href="/search?purpose=for-rent">
            <p className="border-b lg:border-b-0 px-1 py-3 lg:py-4 tracking-wider flex items-center gap-2 cursor-pointer">
              <FcAbout />
              <span
                className={
                  router.pathname === "/search?purpose=for-rent"
                    ? activeLink
                    : inactiveLink
                }
              >
                Rent Property
              </span>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
