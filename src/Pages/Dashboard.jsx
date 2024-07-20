import { useEffect, useState } from "react";
import { CgUserList } from "react-icons/cg";
import { FaComments } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [TotalUsers, setTotalUsers] = useState(0);
  const [TotalPosts, setTotalPosts] = useState(0);
  const [TotalComments, setTotalComments] = useState(0);
  const [RecentUsersData, setRecentUsersData] = useState([]);
  const [RecentCommentData, setRecentCommentData] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Get the total users
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${apiUrl}/api/dashboard/totalusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTotalUsers(data.length);
      } else {
        console.log(data.message);
      }
    };
    getUsers();
  }, [apiUrl]);
  // Get the total Cooments
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`${apiUrl}/api/dashboard/totalcomments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTotalComments(data.length);
      } else {
        console.log(data.message);
      }
    };
    getComments();
  }, [apiUrl]);

  // Get the total Posts
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${apiUrl}/api/dashboard/totalPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTotalPosts(data.length);
      } else {
        console.log(data.message);
      }
    };
    getPosts();
  }, [apiUrl]);

  // Get the Recent added users
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${apiUrl}/api/dashboard/recentUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setRecentUsersData(data);
      } else {
        console.log(data.message);
      }
    };
    getPosts();
  }, [apiUrl]);

  // Get the Recent added commentts
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${apiUrl}/api/dashboard/recentcomments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setRecentCommentData(data);
      } else {
        console.log(data.message);
      }
    };
    getPosts();
  }, [apiUrl]);

  return (
    <div className="flex flex-col md:h-screen ">
      <div className="flex w-full p-4  space-y-4">
        <div className="flex flex-row w-screen md:justify-evenly md:items-center max-md:flex-col flex-1 space-y-4 shadow-xl pb-10">
          <div className="p-6 rounded-lg w-64 max-sm:w-full  border border-gray-50  shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL USERS</h2>
              <p className="text-2xl font-bold">{TotalUsers}</p>
              <p className="text-primary">↑ 11 Last month</p>
            </div>
            <CgUserList size={35} />
          </div>
          <div className="p-6 w-64 max-sm:w-full  rounded-lg border border-gray-50  shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL COMMENTS</h2>
              <p className="text-2xl font-bold">{TotalComments}</p>
              <p className="text-primary">↑ 2 Last month</p>
            </div>
            <FaComments size={35} />
          </div>
          <div className="p-6 w-64 max-sm:w-full  rounded-lg  border border-gray-50 shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL POSTS</h2>
              <p className="text-2xl font-bold">{TotalPosts}</p>
              <p className="text-primary">↑ 0 Last month</p>
            </div>
            <IoDocumentText size={35} />
          </div>
        </div>
      </div>

      <div className="flex mt-4 flex-col md:flex-row w-full  p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className=" border border-gray-50 p-6 rounded-lg shadow-xl flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent users</h2>
            <Link
              className=" bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out text-white font-bold  px-4 py-2 rounded-lg"
              to={""}
            >
              See all
            </Link>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-left">USER IMAGE</th>
                  <th className="text-left">USERNAME</th>
                </tr>
              </thead>
              <tbody>
                {RecentUsersData?.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          className="w-8 h-8 rounded-full "
                          src={
                            user.profilePicture || "https://placehold.co/32x32"
                          }
                          alt={user.name}
                        />
                      </td>
                      <td className="capitalize font-medium">{user.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className=" border border-gray-50 p-6 rounded-lg shadow-xl flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent comments</h2>
            <Link
              className=" bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out text-white font-bold  px-4 py-2 rounded-lg"
              to={""}
            >
              See all
            </Link>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-left">COMMENT CONTENT</th>
                  <th className="text-left">LIKES</th>
                </tr>
              </thead>
              <tbody>
                {RecentCommentData.map((comment, index) => {
                  return (
                    <tr key={index}>
                      <td>{comment.content}</td>
                      <td>{comment.numberoflikes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
