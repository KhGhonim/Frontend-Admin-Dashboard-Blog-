import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Redux/userSlice";
import GoogleAuth from "./GoogleAuth";
import { ToastContainer } from "react-toastify";
export default function SigIn() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const nevigate = useNavigate();
  // @ts-ignore
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const HandleLogin = async (eo) => {
    eo.preventDefault();
    dispatch(signInStart());

    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      dispatch(signInFailure(data.message));
    } else {
      dispatch(signInSuccess(data));
      nevigate("/");
    }

    eo.target.reset();
  };

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        dispatch(signInFailure(null));
      }
    }, 3000);
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="bg-white w-full max-w-md p-10 rounded-lg shadow-xl">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome Back!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Sign in to access your account
        </p>

        {/* Form */}
        <form onSubmit={HandleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              defaultValue={email}
              onChange={(e) => setemail(e.target.value.toLowerCase())}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              defaultValue={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between text-sm text-gray-500">
            <a href="/ForgotPW" className="hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-2 text-sm text-red-500 text-center">
              {errorMessage}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 focus:outline-none"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 w-full text-center justify-center">
          <span className="w-1/3 h-[1px] bg-gray-300"></span>
          <span className="text-sm text-gray-500 mx-2">OR</span>
          <span className="w-1/3 h-[1px] bg-gray-300"></span>
        </div>

        <GoogleAuth />

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
