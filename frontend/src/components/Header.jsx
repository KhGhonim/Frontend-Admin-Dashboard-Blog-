import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../Redux/userSlice";
import { CgLogOut, CgProfile } from "react-icons/cg";

// eslint-disable-next-line react/prop-types
export default function Header({ setDarkLightMode, DarkLightMode }) {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const SignUpModelCloser = () => {
    setIsMenuOpen(false);
  };

  // {Change Between True and False}
  const ref = useRef(null);
  useEffect(() => {
    // Event handler for clicking outside the SignUp modal
    const HandleModelCloser = (eo) => {
      // Check if the click is not inside the SignUp div
      if (ref.current && !ref.current.contains(eo.target)) {
        // Close the modal
        SignUpModelCloser();
      }
    };

    // Add the event listener for clicking outside the SignUp modal
    document.addEventListener("mousedown", HandleModelCloser);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", HandleModelCloser);
    };
  }, []); // Empty dependency array ensures the effect runs only once

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

  const HandleSignOut = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signout`, {
        method: "POST",

        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      error.message = "Failed to sign out";
    }
  };

  return (
    <header className="bg-[--background-color] shadow-lg rounded-b-xl">
      <div className=" flex h-16 max-w-screen-3xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link className="block text-teal-600" to="/">
          <span className="sr-only">Home</span>
          <h1 className="text-3xl">
            <span className="text-teal-900 font-bold">KG</span>NEWS
          </h1>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <div className="hidden md:block"></div>

          <div className="flex items-center gap-4">
            {/* Login and Register buttons */}
            {!currentUser ? (
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
            ) : (
              <div className="sm:flex sm:gap-4">
                {/* <Link
                  className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 sm:block"
                  to="/auth/login"
                  onClick={() => {
                    dispatch(signoutSuccess());
                  }}
                >
                  Log Out
                </Link> */}

                {/* <div className="sm:flex sm:gap-4 relative">
                  <img src="" alt="" className="w-8 h-8 rounded-full m-1" />

            <div
             className="flex flex-col gap-1 absolute top-10 right-0  bg-[--background-color] text-[--text-color] p-7 rounded-xl">
            <h3 className="text-[--text-color] flex justify-center items-center gap-3 ">Welcome! {currentUser?.user.name} <FaUser/></h3>
            <h3 className="text-[--text-color]">{currentUser?.user.email}</h3>
            </div>

                </div> */}

                <div
                  onClick={HandleMenu}
                  className="relative inline-block text-left cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="capitalize">{currentUser.name}</span>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={currentUser?.profilePicture}
                      alt="User profile picture"
                    />
                  </div>
                  <div
                    ref={ref}
                    className={` ${
                      IsMenuOpen ? "block" : "hidden"
                    } absolute border z-30 border-gray-50 p-2 right-0 mt-2 w-48  rounded-md shadow-lg bg-[--background-color] text-[--text-color] font-medium`}
                  >
                    <div className="py-1">
                      <Link
                        to={`/Profile/update/${currentUser?._id}`}
                        className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-teal-700 duration-300 transition-all ease-linear rounded-lg"
                      >
                        Settings
                        <IoSettings size={20} className="ml-auto" />
                      </Link>
                      <Link
                        to="/Profile"
                        className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-teal-700 duration-300 transition-all ease-linear rounded-lg"
                      >
                        Profile
                        <CgProfile size={20} className="ml-auto" />
                      </Link>
                      <div
                        onClick={() => {
                          dispatch(signoutSuccess());
                          HandleSignOut();
                        }}
                        className="flex items-center px-4 py-2 text-sm  hover:bg-teal-700 duration-300 transition-all ease-linear rounded-lg cursor-pointer"
                      >
                        Logout
                        <CgLogOut size={20} className="ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
            {/* <button
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
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {/* <div
        ref={ref}
        className={`transition-transform duration-500 ease-in-out  ${
          IsMenuOpen ? " translate-y-0 " : " translate-y-[-1000%] opacity-100 "
        }absolute  z-10 w-full bg-[--background-color]  shadow-lg  md:hidden`}
      >
        {currentUser ? null : (
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
        )}
      </div> */}
    </header>
  );
}
