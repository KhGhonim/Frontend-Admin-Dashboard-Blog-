import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [PostsData, setPostsData] = useState(null);
  const [PostId, setPostId] = useState(null);
  const [TotalPostsInDashboard, setTotalPostsInDashboard] = useState(6);
  // {Change Between True and False}
  const HandleShowMore = () => {
    setTotalPostsInDashboard((prev) => prev + 4);
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${apiUrl}/api/post/allposts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setPostsData(data);
      } else {
        console.log(data.message);
      }
    };
    getPosts();
  }, []);

  const navigate = useNavigate();

  const deletePostHandler = async (eo) => {
    eo.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/post/deletepost/${PostId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setPostsData(PostsData.filter((post) => post._id !== PostId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Something went wrong, try again later");
    }
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
        {PostsData.slice(0, TotalPostsInDashboard).map((post, index) => {
          const day = moment(post.createdAt).date();
          const month = moment(post.createdAt).format("MMMM");
          const year = moment(post.createdAt).year();
          return (
            <tbody key={index}>
              <tr className="text-center border-b ">
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {index + 1}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {day} {month}, {year}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {post.author}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs hidden sm:table-cell">
                  <img
                    src={post.postImage}
                    alt={post.title}
                    className="w-12 h-12 object-cover rounded mx-auto"
                  />
                </td>

                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {post.title}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {post.catagory}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  {post.userId}
                </td>
                <td className="py-4 px-4 text-base max-sm:text-xs">
                  <form
                    onSubmit={deletePostHandler}
                    className="flex justify-center items-center space-x-2"
                  >
                    <div
                      onClick={() => navigate(`/post/update/${post._id}`)}
                      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ease-linear py-1 px-4 rounded cursor-pointer"
                    >
                      Edit
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ease-linear py-1 px-4 rounded"
                      onClick={() => setPostId(post._id)}
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
          <button>Load More Posts</button>
        </div>
      )}
    </div>
  );
}
