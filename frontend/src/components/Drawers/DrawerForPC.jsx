import { IoAdd, IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CgEye, CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional for default styling
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DrawerForPC() {
  const [BigScreensDrawerVisiability, setBigScreensDrawerVisiability] =
    useState(false);
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);

  const HandleBigScreensDrawerVisiability = () => {
    setBigScreensDrawerVisiability((prev) => !prev);
  };
  return currentUser ? (
    <div className="fixed z-50">
      {/* Large screens Drawer */}
      <div
        onMouseEnter={HandleBigScreensDrawerVisiability}
        onMouseLeave={HandleBigScreensDrawerVisiability}
        className="hidden md:flex w-32 h-screen "
      >
        <div
          className={`${
            BigScreensDrawerVisiability
              ? "translate-x-0"
              : "translate-x-[-1000%]"
          } md:flex fixed  top-1/3 left-5 h-[400px] rounded-full w-20 bg-gray-100 p-4 border border-green-200 z-30 shadow-lg flex-col items-center transition-all duration-500 ease-in-out`}
        >
          <Tippy content="Home">
            <Link
              className="mb-6 flex-1 flex justify-center items-center"
              to={"/"}
            >
              <button>
                <IoHome
                  className="text-teal-600 hover:text-teal-800"
                  size={24}
                />
              </button>
            </Link>
          </Tippy>
          <Tippy content="Dashboard">
            <Link
              className="mb-6 flex-1 flex justify-center items-center"
              to={"/dashboard"}
            >
              <button>
                <LuLayoutDashboard
                  className="text-teal-600 hover:text-teal-800"
                  size={24}
                />
              </button>
            </Link>
          </Tippy>
          <Tippy content="Create Post">
            <Link
              className="relative mb-6 flex-1 flex justify-center items-center"
              to={"/post/editor"}
            >
              <button className="absolute left-1/2 transform -translate-x-1/2 bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-700 text-white rounded-full p-4 shadow-lg">
                <IoAdd color="white" size={24} />
              </button>
            </Link>
          </Tippy>
          <Tippy content="Search">
            <Link
              className="mb-6 flex-1 flex justify-center items-center"
              to={"/search"}
            >
              <button>
                <FaSearch
                  className="text-teal-600 hover:text-teal-800"
                  size={24}
                />
              </button>
            </Link>
          </Tippy>

          <Tippy content="See Posts">
            <Link
              className="mb-6 flex-1 flex justify-center items-center"
              to={"/Posts"}
            >
              <button>
                <CgEye
                  className="text-teal-600 hover:text-teal-800"
                  size={24}
                />
              </button>
            </Link>
          </Tippy>

          <Tippy content="Profile">
            <Link
              className="mb-6 flex-1 flex justify-center items-center"
              to={"/profile"}
            >
              <button>
                <CgProfile
                  className="text-teal-600 hover:text-teal-800"
                  size={24}
                />
              </button>
            </Link>
          </Tippy>
        </div>
      </div>
    </div>
  ) : null;
}
