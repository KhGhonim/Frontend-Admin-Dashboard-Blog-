import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "./GoogleAuth";

export default function Register() {
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const HandleRegister = async (eo) => {
    eo.preventDefault();
    setloading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setloading(false);
      return;
    }

    const data = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });
    const response = await data.json();

    if (response.message === "User created successfully") {
      toast.success("Register Successfull");
      setloading(false);
      eo.target.reset();
      navigate("/auth/login");
    } else {
      toast.error(response.message);
      setloading(false);
      eo.target.reset();
    }

    setloading(false);
    eo.target.reset();
  };
  return (
    <div className="w-full  h-screen  flex flex-col justify-center mx-auto max-w-xl p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">
        Welcome to Sign Up Page!
      </h1>
      <form onSubmit={HandleRegister} className="space-y-6 ">
        <div className="space-y-1 text-sm">
          <label htmlFor="Name" className="block dark:text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="username"
            defaultValue={name}
            id="username"
            placeholder="Name"
            onChange={(eo) => {
              let value = eo.target.value;
              setname(value.toLowerCase());
            }}
            className="w-full px-4 py-3 rounded-md outline-none text-black"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Email
          </label>
          <input
            defaultValue={email}
            type="email"
            name="Email"
            id="Email"
            onChange={(eo) => {
              let value = eo.target.value;
              setemail(value.toLowerCase());
            }}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md outline-none  text-black"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            defaultValue={password}
            id="password"
            onChange={(eo) => {
              let value = eo.target.value;
              setpassword(value.toLowerCase());
            }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md outline-none  text-black"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            defaultValue={confirmPassword}
            id="confirmPassword"
            onChange={(eo) => {
              let value = eo.target.value;
              setconfirmPassword(value.toLowerCase());
            }}
            placeholder="Confirm your Password"
            className="w-full px-4 py-3 rounded-md outline-none  text-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="block w-full p-3 text-center rounded-md bg-teal-700 transition-colors duration-300 ease-in-out hover:bg-teal-800 text-white"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <GoogleAuth/>
      </form>

      {/* Social Login */}
      {/* <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Sign Up with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button aria-label="Log in with Google" className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800">
          <IoLogoGoogle color="white" size={24} />
        </button>
        <button aria-label="Log in with Facebook" className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800">
          <IoLogoFacebook color="white" size={24} />
        </button>
        <button aria-label="Log in with GitHub" className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800">
          <IoLogoGithub color="white" size={24} />
        </button>
      </div> */}
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Already have an account?
        <a
          rel="noopener noreferrer"
          href="/auth/login"
          className="underline dark:text-gray-800"
        >
          Log In
        </a>
      </p>
    </div>
  );
}
