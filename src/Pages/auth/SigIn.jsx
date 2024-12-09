import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure } from "../../Redux/userSlice";
import GoogleAuth from "./GoogleAuth";
import { ToastContainer } from "react-toastify";
import useHandleLogin from "../../Hooks/HandleLogin/useHandleLogin";

export default function SigIn() {
  const { setemail, setpassword, HandleLogin, email, password, loading } =
    useHandleLogin();

  // @ts-ignore
  const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        dispatch(signInFailure(null));
      }
    }, 3000);
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to access your account
        </p>

        {/* Form */}
        <form onSubmit={HandleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1">
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>

          {/* Admin Hint */}
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded mb-6">
            <p className="text-xs font-semibold text-red-800">
              Want to join as admin? <br />
              <span className="font-semibold">ID:</span> admin@admin.com <br />
              <span className="font-semibold">PW:</span> 123456
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-right">
            <a
              href="/ForgotPW"
              className="text-teal-600 hover:underline focus:outline-none"
            >
              Forgot your password?
            </a>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-sm text-red-500 text-center">
              {errorMessage}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold transition hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 focus:outline-none"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <span className="flex-1 h-[1px] bg-gray-300"></span>
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <span className="flex-1 h-[1px] bg-gray-300"></span>
        </div>

        {/* Google Auth */}
        <GoogleAuth />

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-teal-600 font-medium hover:underline focus:outline-none"
          >
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
