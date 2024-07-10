import { IoAdd, IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional for default styling
export default function DrawerForMobiles() {
  
  return (
    <div className="hidden max-sm:flex absolute bottom-10 left-0 right-0 w-80  mx-auto rounded-full  justify-center items-center bg-gray-100 p-4 shadow-lg">
      <div className="relative flex justify-between items-center w-full max-w-md">
        <Tippy content="Home">
          <Link
            className="flex-1 flex justify-center h-5 items-center  "
            to={"/"}
          >
            <button>
              <IoHome
                className="text-teal-600 hover:text-teal-800 "
                size={24}
              />
            </button>
          </Link>
        </Tippy>
        <Tippy content="Dashboard">
          <Link
            className="flex-1  flex justify-center items-center "
            to={"/dashboard"}
          >
            <button>
              <LuLayoutDashboard
                className="text-teal-600 hover:text-teal-800 "
                size={24}
              />
            </button>
          </Link>
        </Tippy>
        <Tippy content="Create Post">
          <Link
            className="relative flex-1 flex justify-center items-center"
            to={"/post/editor"}
          >
            <button className="absolute  -top-10 bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-700 text-white rounded-full p-4 shadow-lg">
              <IoAdd color="white" size={24} />
            </button>
          </Link>
        </Tippy>
        <Tippy content="Search">
          <Link
            className="flex-1 flex justify-center items-center"
            to={"/search"}
          >
            <button>
              <FaSearch
                className="text-teal-600 hover:text-teal-800 "
                size={24}
              />
            </button>
          </Link>
        </Tippy>
        <Tippy content="Profile">
          <Link
            className="flex-1 flex justify-center items-center"
            to={"/profile"}
          >
            <button>
              <CgProfile
                className="text-teal-600 hover:text-teal-800 "
                size={24}
              />
            </button>
          </Link>
        </Tippy>
      </div>
    </div>
  );
}
