
export default function Register() {
  return (
    <div className="w-full  h-screen  flex flex-col justify-center mx-auto max-w-xl p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
      <h1 className="text-2xl font-bold text-center">Welcome to Sign Up Page!</h1>
      <form className="space-y-6 ">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md outline-none text-[--input-text-color]"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md outline-none text-[--text-color]"
          />
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-md bg-teal-700 transition-colors duration-300 ease-in-out hover:bg-teal-800 text-white">
          Sign in
        </button>
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
          href="#"
          className="underline dark:text-gray-800"
        >
          Log In
        </a>
      </p>
    </div>
  );
}
