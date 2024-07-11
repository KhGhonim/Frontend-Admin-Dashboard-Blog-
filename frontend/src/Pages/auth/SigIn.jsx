import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SigIn() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setloading] = useState(false);
  const nevigate = useNavigate();

  const HandleLogin = async (eo) => {
    eo.preventDefault();
    setloading(true);

    const data = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await data.json();

    if (response.message === "Login successful") {
      toast.success("Login successful");
      setloading(false);
      eo.target.reset();
      nevigate("/");
    } else if (response.message === "User does not exist") {
      toast.error("User does not exist");
      setloading(false);
    } else if (response.message === "Invalid credentials") {
      toast.error("Invalid credentials");
      setloading(false);
    }

    setloading(false);
    eo.target.reset();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center mx-auto max-w-lg   p-12 space-y-4 text-center dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-3xl font-semibold mb-1">Sign in to your account</h1>

      <form onSubmit={HandleLogin} className="space-y-4">
        <div className="flex flex-col gap-6">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-md outline-none text-black"
            onChange={(eo) => {
              let value = eo.target.value;
              setemail(value.toLowerCase());
            }}
            defaultValue={email}
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md outline-none text-black"
            onChange={(eo) => {
              let value = eo.target.value;
              setpassword(value.toLowerCase());
            }}
            defaultValue={password}
          />
        </div>
        <div className="flex justify-between">
          <a className="text-sm dark:text-gray-600" href="/ForgotPW">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 space-x-2 transition-colors duration-300 ease-in-out hover:bg-teal-800 font-semibold rounded bg-teal-700 text-white"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>

      {/* Social Login */}
      {/* <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          aria-label="Log in with Google"
          className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800"
        >
          <IoLogoGoogle color="white" size={24} />
        </button>
        <button
          aria-label="Log in with Facebook"
          className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800"
        >
          <IoLogoFacebook color="white" size={24} />
        </button>
        <button
          aria-label="Log in with GitHub"
          className="p-2 rounded-full bg-teal-600 transition-colors duration-300 ease-in-out hover:bg-teal-800"
        >
          <IoLogoGithub color="white" size={24} />
        </button>
      </div> */}
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Dont have an account?
        <a
          rel="noopener noreferrer"
          href="/auth/register"
          className="underline dark:text-gray-800"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
