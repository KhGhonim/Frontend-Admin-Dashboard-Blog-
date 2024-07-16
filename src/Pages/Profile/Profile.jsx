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
  const apiUrl = import.meta.env.VITE_API_URL

  const dispatch = useDispatch();
  const HandleUserDelete = async (eo) => {
    eo.preventDefault();

    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${apiUrl}/api/delete/${
          currentUser?._id || currentUser?.user._id
        }`,
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
    <div className="flex justify-center items-center flex-col h-screen">
      <div className=" p-6 rounded-lg shadow-2xl w-11/12 max-w-3xl">
        <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 rounded-full border-4 object-cover border-white"
            src={
              currentUser?.profilePicture || currentUser?.user?.profilePicture
            }
            alt={currentUser?.name || currentUser?.user?.name}
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-2xl font-semibold capitalize ">
            {currentUser?.name || currentUser?.user?.name}
          </h2>
          <p className="font-light">Los Angeles, California</p>
          <div className="mt-2">
            <p className="font-medium">
              <i className="fas fa-briefcase"></i> Solution Manager - Creative
              Tim Officer
            </p>
            <p className="font-bold">
              <i className="fas fa-university"></i> University of Computer
              Science
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="font-normal">
            An artist of considerable range, Jenna the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={closeModalHandler}
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-3 cursor-pointer z-20"
        >
          Delete User
        </button>
      </div>

      <div
        className={`${
          closeModal ? "block" : "hidden"
        } fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className=" bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Delete User</h2>
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <form
            onSubmit={HandleUserDelete}
            className="flex justify-end space-x-4"
          >
            <div
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              onClick={closeModalHandler}
            >
              Cancel
            </div>
            <button
              className="bg-red-500 text-white hover:bg-red-600  px-4 py-2 rounded-lg"
              type="submit"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
