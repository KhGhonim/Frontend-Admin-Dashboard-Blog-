import useFetchPosts from "../Hooks/GetotalPosts/GetotalPosts";
import useFetchcomment from "../Hooks/GetotalCooments/GetotalCooments";
import useGetotalusers from "../Hooks/Getotalusers/Getotalusers";
import { CgUserList } from "react-icons/cg";
import { FaComments, FaSpinner } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import useFetchGetRecentaddedusers from "../Hooks/GetRecentaddedusers/GetRecentaddedusers";
import useFetchGetRecentaddedcomments from "../Hooks/GetRecentaddedcomments/GetRecentaddedcomments";

export default function Dashboard() {
  const { data, loading } = useGetotalusers();
  const { comment, commentloading } = useFetchcomment();
  const { Posts, Postsloading } = useFetchPosts();
  const { RecentUsers, RecentUserLoading } = useFetchGetRecentaddedusers();
  const { GetRecentaddedcomments, GetRecentaddedcommentsloading } =
    useFetchGetRecentaddedcomments();

  return (
    <div className="flex h-screen ">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[--background-color] rounded-xl shadow-lg">
            <h2 className="text-gray-500">Total Users</h2>
            <div className="flex justify-between items-center">
              {loading ? (
                <FaSpinner className="animate-spin text-gray-400" />
              ) : (
                <p className="text-4xl font-bold text-teal-600">
                  {data?.length || 0}
                </p>
              )}
              <CgUserList className="text-5xl text-teal-500" />
            </div>
          </div>
          <div className="p-6 bg-[--background-color] rounded-xl shadow-lg">
            <h2 className="text-gray-500">Total Comments</h2>
            <div className="flex justify-between items-center">
              {commentloading ? (
                <FaSpinner className="animate-spin text-gray-400" />
              ) : (
                <p className="text-4xl font-bold text-teal-600">
                  {comment?.length || 0}
                </p>
              )}
              <FaComments className="text-5xl text-teal-500" />
            </div>
          </div>
          <div className="p-6 bg-[--background-color] rounded-xl shadow-lg">
            <h2 className="text-gray-500">Total Posts</h2>
            <div className="flex justify-between items-center">
              {Postsloading ? (
                <FaSpinner className="animate-spin text-gray-400" />
              ) : (
                <p className="text-4xl font-bold text-teal-600">
                  {Posts?.length || 0}
                </p>
              )}
              <IoDocumentText className="text-5xl text-teal-500" />
            </div>
          </div>
        </div>

        <div className="">
          {/* Detailed Table Section */}
          <div className="mt-8 bg-[--background-color]  rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div>
                <h4 className="text-lg font-semibold text-teal-600 mb-2">
                  Recent Users
                </h4>
                {RecentUserLoading ? (
                  <FaSpinner className="animate-spin text-gray-400" />
                ) : RecentUsers?.length ? (
                  <ul className="divide-y divide-gray-200">
                    {RecentUsers.map((user, index) => (
                      <li key={index} className="flex items-center py-3">
                        <img
                          src={
                            user.profilePicture || "https://placehold.co/32x32"
                          }
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium">{user.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No recent users found.
                  </p>
                )}
              </div>

              {/* Recent Comments */}
              <div>
                <h4 className="text-lg font-semibold text-teal-600 mb-2">
                  Recent Comments
                </h4>
                {GetRecentaddedcommentsloading ? (
                  <FaSpinner className="animate-spin text-gray-400" />
                ) : GetRecentaddedcomments?.length ? (
                  <ul className="divide-y divide-gray-200">
                    {GetRecentaddedcomments.map((comment, index) => (
                      <li key={index} className="py-3">
                        <p className="text-sm">{comment.content}</p>
                        <span className="text-gray-400 text-xs">
                          {comment.numberoflikes} likes
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No recent comments found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
