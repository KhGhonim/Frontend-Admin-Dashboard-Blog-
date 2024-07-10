
export default function SigIn() {
  return (
    <div className="w-full h-screen flex flex-col justify-center mx-auto max-w-lg   p-12 space-y-4 text-center dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-3xl font-semibold mb-1">Sign in to your account</h1>

      <form className="space-y-4">
        <div className="flex flex-col gap-6">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-md outline-none text-[--text-color]"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md outline-none text-[--text-color]"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              aria-label="Remember me"
              className="mr-1 rounded-sm focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2 dark:accent-violet-600"
            />
            <label htmlFor="remember" className="text-sm dark:text-gray-600">
              Remember me
            </label>
          </div>
          <a className="text-sm dark:text-gray-600" href="/">
            Forgot your password?
          </a>
        </div>
        <button
          type="button"
          className="px-8 py-3 space-x-2 transition-colors duration-300 ease-in-out hover:bg-teal-800 font-semibold rounded bg-teal-700 text-white"
        >
          Sign in
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
          href="#"
          className="underline dark:text-gray-800"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
