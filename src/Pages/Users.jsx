import moment from "moment";
import { useEffect, useState } from "react";
import { CgCheck, CgClose } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [PostsData, setPostsData] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [TotalPostsInDashboard, setTotalPostsInDashboard] = useState(5);
  const [ChangeAdminStatus, setChangeAdminStatus] = useState(null);

  const HandleShowMore = () => {
    setTotalPostsInDashboard((prev) => prev + 4);
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${apiUrl}/api/AllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setPostsData(data);
      } else {
        console.log(data.message);
      }
    };
    getUsers();
  }, [PostsData]);

  const deletePostHandler = async (eo) => {
    eo.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/api/Admin/deleteuser/${UserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setPostsData(PostsData.filter((user) => user._id !== UserId));
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Something went wrong, try again later");
    }
  };

  const AdminStatusHandler = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/Admin/${UserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          isAdmin: ChangeAdminStatus,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdminStatusChange = (userId, isAdmin) => {
    setUserId(userId);
    setChangeAdminStatus(!isAdmin);

    // Delay the call to AdminStatusHandler until the state updates
    setTimeout(() => {
      AdminStatusHandler();
    }, 300);
  };

  if (!PostsData || PostsData.length === 0) {
    return (
      <div className="container mx-auto p-4 shadow-xl rounded-lg overflow-x-auto animate-pulse">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-300 text-center text-gray-700">
              <th className="py-3 text-base max-sm:text-xs border-b ">Num</th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b ">
                Post Published Date
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b ">
                Arthor
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b hidden sm:table-cell">
                Post Image
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b">
                Post Title
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b">
                Category
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b">
                User ID
              </th>
              <th className="py-3 text-base max-sm:text-xs px-4 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </td>
              <td className="py-4 px-4 hidden sm:table-cell">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mt-2"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center items-center space-x-2">
                  <div className="py-1 px-4 rounded bg-gray-200"></div>
                  <div className="py-1 px-4 rounded bg-gray-200"></div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 shadow-xl rounded-lg overflow-x-auto">
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-center text-gray-700">
            <th className="py-3 text-base max-sm:text-xs border-b ">Num</th>
            <th className="py-3 text-base max-sm:text-xs px-4 border-b ">
              User Created
            </th>

            <th className="py-3 text-base max-sm:text-xs px-4 border-b hidden sm:table-cell">
              User Image
            </th>
            <th className="py-3 text-base max-sm:text-xs px-4 border-b">
              Username
            </th>
            <th className="py-3 text-base max-sm:text-xs px-4 border-b">
              Email
            </th>
            <th className="py-3 text-base max-sm:text-xs px-4 border-b">
              Admin
            </th>
            <th className="py-3 text-base max-sm:text-xs px-4 border-b">
              Delete
            </th>
          </tr>
        </thead>
        {PostsData.slice(0, TotalPostsInDashboard).map((user, index) => {
          const day = moment(user.createdAt).date();
          const month = moment(user.createdAt).format("MMMM");
          const year = moment(user.createdAt).year();
          return (
            <tbody key={index}>
              <tr className="text-center border-b ">
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {index + 1}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {day} {month}, {year}
                </td>

                <td className="py-4 px-4 text-base  max-sm:text-xs hidden sm:table-cell">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-12 h-12 object-cover  mx-auto rounded-full"
                  />
                </td>

                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {user.name}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {user.email}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {user.isAdmin ? (
                    <CgCheck
                      className="hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out"
                      color="green"
                      size={30}
                      onClick={() => {
                        handleAdminStatusChange(user._id, user.isAdmin);
                      }}
                    />
                  ) : (
                    <CgClose
                      className="hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out"
                      color="red"
                      size={25}
                      onClick={() => {
                        handleAdminStatusChange(user._id, user.isAdmin);
                      }}
                    />
                  )}
                </td>

                <td className="py-4 px-4 text-base max-sm:text-xs">
                  <form
                    onSubmit={deletePostHandler}
                    className="flex justify-center items-center space-x-2"
                  >
                    <button
                      type="submit"
                      className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ease-linear py-1 px-4 rounded"
                      onClick={() => setUserId(user._id)}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      {TotalPostsInDashboard < PostsData.length && (
        <div
          onClick={HandleShowMore}
          className="flex justify-center w-full bg-teal-500 p-2 px-2 cursor-pointer"
        >
          <button>Load More Users</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
