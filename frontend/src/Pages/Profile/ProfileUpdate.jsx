import { useSelector } from "react-redux";

export default function ProfileUpdate() {
  // @ts-ignore
  const {
    currentUser,
    loading,
    error: userError,
  // @ts-ignore
  } = useSelector((state) => state.user);

  return (
    <div className="relative w-screen h-dvh">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2128959116/display_1500/stock-vector-abstract-waving-particle-technology-background-design-abstract-wave-moving-dots-flow-particles-hi-2128959116.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <form className="flex flex-col items-center p-6 text-black rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 ">Profile</h1>
        <div className="relative mb-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-primary"
            src="https://placehold.co/100x100"
            alt="Profile picture"
          />
        </div>
        <div className="w-full mb-4">
          <input
            type="text"
            defaultValue={currentUser?.user.name}
            placeholder="Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <div className="w-full mb-4">
          <input
            defaultValue={currentUser?.user.email}
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <div className="w-full mb-6">
          <input
            defaultValue={currentUser?.user.password}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gray-950 p-3 rounded-lg hover:bg-black/80 focus:outline-none focus:ring-2 text-white"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {userError && <p className="text-red-500">{userError}</p>}
    </div>
  );
}
