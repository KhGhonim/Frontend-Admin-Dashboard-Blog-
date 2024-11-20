import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Register() {
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);
  const [SignUPerror, setSignUPerror] = useState(null);
  const navigate = useNavigate();
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const HandleRegister = async (eo) => {
    eo.preventDefault();
    setloading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setloading(false);
      return;
    }

    const res = await fetch(`${apiUrl}/api/auth/register`, {
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
    const data = await res.json();

    if (!res.ok) {
      toast.error("Registration failed");
      setloading(false);
      setSignUPerror("Registration failed");
      return;
    } else {
      navigate("/auth/login");
      toast.success("Registration successful");
    }

    eo.target.reset();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent lg:py-5">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Create Your Account
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Join us and explore endless possibilities!
        </p>

        {/* Form */}
        <form onSubmit={HandleRegister} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your full name"
              defaultValue={name}
              onChange={(e) => setname(e.target.value.toLowerCase())}
              className="w-full p-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
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
              className="w-full p-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
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
              placeholder="Enter a strong password"
              defaultValue={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              defaultValue={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-[--input-text-color] focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-teal-700 text-white text-lg font-semibold transition hover:bg-teal-800 focus:ring-4 focus:ring-teal-400 focus:outline-none"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Error Message */}
        {SignUPerror && (
          <div className="mt-4 text-sm text-red-500 text-center">
            Something went wrong. Please try again.
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-6 w-full text-center justify-center">
          <span className="w-1/3 h-[1px] bg-gray-300"></span>
          <span className="text-sm text-gray-500 mx-2">OR</span>
          <span className="w-1/3 h-[1px] bg-gray-300"></span>
        </div>

        {/* Google Authentication */}
        <GoogleAuth />

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Log In
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
