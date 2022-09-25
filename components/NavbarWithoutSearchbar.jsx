import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const activeLink = "text-green-700";
  const inactiveLink = "hover:text-green-700";

  return (
    <div className="flex justify-between items-center">
      <div className="text-[1.7rem] font-bold text-green-700">
        <Link href="/" className="pl-2">
          Homelyy
        </Link>
      </div>
      <div className="hidden lg:flex text-lg font-bold gap-8 text-gray-800">
        <p className={router.pathname === "/" ? activeLink : inactiveLink}>
          <Link href="/">Home</Link>
        </p>
        <p
          className={router.pathname === "/search" ? activeLink : inactiveLink}
        >
          <Link href="/search">All Properties</Link>
        </p>
        <p
          className={
            router.pathname === "/search?purpose=for-sale"
              ? activeLink
              : inactiveLink
          }
        >
          <Link href="/search?purpose=for-sale">Buy Property</Link>
        </p>
        <p
          className={
            router.pathname === "/search?purpose=for-rent"
              ? activeLink
              : inactiveLink
          }
        >
          <Link href="/search?purpose=for-rent">Rent Property</Link>
        </p>
      </div>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setShowMenu(true)}
        className="lg:hidden text-2xl text-black font-bold"
      >
        <FcMenu />
      </button>
      {showMenu && (
        <div className="fixed h-screen top-0 right-0 w-[250px] px-5 rounded bg-white shadow-md text-lg">
          <div className="h-[80px] px-0 md:px-5 text-2xl w-full flex text-right items-center justify-end">
            <p>
              <IoMdClose onClick={() => setShowMenu(false)} />
            </p>
          </div>
          <Link href="/">
            <p className="border-y px-1 py-3 flex items-center gap-2">
              <FcHome />
              <span
                className={router.pathname === "/" ? activeLink : inactiveLink}
              >
                Home
              </span>
            </p>
          </Link>
          <Link href="/search">
            <p className="border-b px-1 py-3 flex items-center gap-2">
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
            <p className="border-b px-1 py-3 flex items-center gap-2">
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
            <p className="border-b px-1 py-3 flex items-center gap-2">
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
