import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../Redux/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const [closeModal, setcloseModal] = useState(false);
  // {Change Between True and False}
  const nevigate = useNavigate();
  const closeModalHandler = () => {
    setcloseModal((prev) => !prev);
  };
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const HandleUserDelete = async (eo) => {
    eo.preventDefault();

    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${apiUrl}/api/delete/${currentUser?._id || currentUser?.user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
        setcloseModal(false);
        nevigate("/");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen  p-6">
      {/* Profile Card */}
      <div className="mx-auto max-w-4xl  shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-teal-400 to-blue-500">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={
                currentUser?.profilePicture || currentUser?.user?.profilePicture
              }
              alt={currentUser?.name || currentUser?.user?.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="text-center mt-16 px-6">
          <h2 className="text-2xl font-semibold capitalize  text-[--text-color]">
            {currentUser?.name || currentUser?.user?.name}
          </h2>
          <p className="text-sm  text-[--text-color]">
            Los Angeles, California
          </p>
          <p className="mt-2  text-[--text-color]">
            Solution Manager - Creative Tim Officer
          </p>
          <p className="font-medium  text-[--text-color]">
            <i className="fas fa-university"></i> University of Computer Science
          </p>
        </div>

        {/* About Section */}
        <div className="p-6  text-[--text-color]">
          <h3 className="text-lg font-semibold  text-[--text-color] mb-3">
            About
          </h3>
          <p className="text-sm">
            An artist of considerable range, Jenna the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="flex justify-around bg-[--background-color] py-4">
          <div className="text-center">
            <h4 className="font-bold  text-[--text-color] text-lg">120</h4>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <h4 className="font-bold  text-[--text-color] text-lg">50</h4>
            <p className="text-sm text-gray-500">Clients</p>
          </div>
          <div className="text-center">
            <h4 className="font-bold  text-[--text-color] text-lg">5 Years</h4>
            <p className="text-sm text-gray-500">Experience</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-6 pb-6">
          <button
            onClick={closeModalHandler}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Delete User
          </button>
          <button
            onClick={() =>
              nevigate(
                `/Profile/update/${currentUser?._id || currentUser?.user._id}`
              )
            }
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {closeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[--background-color] rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg  text-[--text-color] font-semibold mb-4">
              Delete User
            </h2>
            <p className=" text-[--text-color] mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <form
              onSubmit={HandleUserDelete}
              className="flex justify-end space-x-4"
            >
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700  text-[--text-color] px-4 py-2 rounded-lg"
                onClick={closeModalHandler}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
