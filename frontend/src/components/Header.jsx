import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Header({ setDarkLightMode, DarkLightMode }) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  // {Change Between True and False}
  const HandleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const element = document.documentElement;

    if (DarkLightMode === "dark") {
      element.classList.remove("light");
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      element.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [DarkLightMode]);

  const DarkLightModeHandler = () => {
    setDarkLightMode((data) => (data === "dark" ? "light" : "dark"));
  };

  return (
    <header className="bg-[--background-color] shadow-lg rounded-b-xl">
      <div className=" flex h-16 max-w-screen-3xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link className="block text-teal-600" to="/">
          <span className="sr-only">Home</span>
          <h1 className="text-3xl">
            <span className="text-teal-900 font-bold">KG</span>BLOG
          </h1>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <div className="hidden md:block"></div>

          <div className="flex items-center gap-4">
            {/* Login and Register buttons */}
            <div className="sm:flex sm:gap-4">
              <Link
                className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 sm:block"
                to="/auth/login"
              >
                Login
              </Link>

              <Link
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                to="/auth/register"
              >
                Register
              </Link>
            </div>

            {/* Dark mode toggle */}
            <div>
              <label
                htmlFor="Toggle1"
                className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800"
              >
                <span className="relative">
                  <input id="Toggle1" type="checkbox" className="hidden peer" />
                  <div
                    onClick={DarkLightModeHandler}
                    className="w-10 h-6 rounded-full shadow-inner  bg-green-700 peer-checked:bg-gray-900"
                  ></div>
                  <div
                    onClick={DarkLightModeHandler}
                    className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white peer-checked:bg-gray-100"
                  ></div>
                </span>
              </label>
            </div>

            {/* Menu button */}
            <button
              onClick={HandleMenu}
              className="block rounded   p-2.5 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <span
                className={`inline-block transition-all duration-500 ease-in-out ${
                  IsMenuOpen ? "rotate-360" : ""
                }`}
              >
                {IsMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`transition-transform duration-500 ease-in-out  ${
          IsMenuOpen ? " translate-y-0 " : " translate-y-full opacity-0 "
        }absolute  z-10 w-full bg-[--background-color]  shadow-lg  md:hidden`}
      >
        <div className="flex flex-col gap-6 p-4">
          <Link
            className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition-all duration-300 ease-in hover:bg-teal-600 hover:text-gray-100"
            to="/auth/login"
          >
            Login
          </Link>

          <Link
            className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition-all duration-300 ease-in hover:bg-teal-600 hover:text-gray-100"
            to="/auth/register"
          >
            Register
          </Link>

        </div>
      </div>
    </header>
  );
}
