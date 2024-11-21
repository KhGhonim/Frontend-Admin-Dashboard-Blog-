import { useEffect, useState } from "react";
import { CgSearchFound } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Search() {
  const [Search, setSearch] = useState(null);
  const [Data, setData] = useState([]);
  const [selectedOption, setselectedOption] = useState(null);

  const [Isloading, setIsloading] = useState(false);
  // @ts-ignore
  const localhost = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!Search || Search === "") {
      setIsloading(false);
    } else {
      SearchHandler();
    }
  }, [Search]);

  console.log(Data)

  const SearchHandler = async (eo) => {
    eo.preventDefault();
    setIsloading(true);

    const res = await fetch(
      `${localhost}/api/search?q=${Search}&type=${selectedOption}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      setIsloading(false);
    } else {
      setIsloading(false);
      setData(data);
    }
    setIsloading(false);
  };

  return (
    <div className="min-h-screen  p-8 sm:p-12 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-[--text-color] mb-6">Advanced Search</h1>
        <p className="text-lg text-gray-600 mb-6">
          Find posts or users quickly with our advanced search functionality.
        </p>
        <form
          onSubmit={SearchHandler}
          className="w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col gap-3 md:flex-row items-center space-x-4"
        >
          <select
            onChange={(eo) => setselectedOption(eo.target.value)}
            className=" p-3 border text-[--input-text-color] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="posts">Posts</option>
            <option value="users">Users</option>
          </select>

          <div className="flex items-center w-full gap-2">
          <input
            onChange={(eo) => setSearch(eo.target.value)}
            type="text"
            className="flex-1 p-3 text-[--input-text-color] border-t border-b border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for posts or users..."
          />

          <button
            type="submit"
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all focus:outline-none"
          >
            <CgSearchFound className="w-6 h-6" />
          </button>
          </div>
        </form>
      </header>
      

      <main className="w-full max-w-4xl">
        {selectedOption === null ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-lg text-red-500">Please select an option to search</p>
          </div>
        ) : selectedOption === "users" ? (
          <section>
            <h2 className="text-3xl font-semibold text-[--text-color] mb-8">Users</h2>
            {Isloading ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-lg text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {Data.map((user, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="flex items-center mb-6">
                      <img
                        className="w-20 h-20 rounded-full object-cover mr-6"
                        src={
                          user.profilePicture ||
                          "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
                        }
                        alt="User Avatar"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-[--text-color]">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <div className="flex space-x-4 mt-4">
                          <p
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <i className="fab fa-twitter"></i> Twitter
                          </p>
                          <p
                            className="text-blue-700 hover:text-blue-800"
                          >
                            <i className="fab fa-linkedin"></i> LinkedIn
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section>
            <h2 className="text-3xl font-semibold text-[--text-color] mb-8">Posts</h2>
            {Isloading ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-lg text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
                {Data.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <img
                      className="w-full h-48 object-cover rounded-lg mb-6"
                      src={
                        post.postImage ||
                        "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
                      }
                      alt="Post Image"
                    />
                    <h3 className="text-2xl font-semibold text-[--input-text-color] mb-4">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <p>{post.author}</p>
                      <p>{post.createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
                    </div>
                    <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold">
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <ToastContainer />
    </div>
  );
}
