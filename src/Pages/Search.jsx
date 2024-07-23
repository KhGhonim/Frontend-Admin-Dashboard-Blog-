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

  console.log(Data);
  return (
    <div className="min-h-screen bg-background  flex flex-col items-center p-4">
      <header className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <form onSubmit={SearchHandler} className="relative flex items-center">
          <select
            onChange={(eo) => setselectedOption(eo.target.value)}
            className="p-3 border border-border rounded-l-lg  "
          >
            <option selected disabled>
              Select
            </option>
            <option value="posts">Posts</option>
            <option value="users">Users</option>
          </select>
          <input
            onChange={(eo) => setSearch(eo.target.value)}
            type="text"
            className="w-full p-3 border-t border-b border-border rounded-r-lg  "
            placeholder="Search for posts or users..."
          />
          <button className="absolute right-2 top-2  p-2 rounded-lg hover:bg-primary/80">
            <CgSearchFound className="w-6 h-6" color="blue" />
          </button>
        </form>
      </header>
      <main className="w-full max-w-3xl">
        {selectedOption === null ? (
          <div className="w-full  flex justify-center items-center">
            <p className="text-center text-3xl font-bold">
              Please Select an option to search
            </p>
          </div>
        ) : selectedOption === "users" ? (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            {Isloading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="space-y-4">
                {Data.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 border border-border rounded-lg bg-card text-card-foreground flex items-center"
                    >
                      <img
                        className="w-12 h-12 rounded-full mr-4"
                        src={
                          user.profilePicture ||
                          "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
                        }
                        alt="User Avatar"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-muted-foreground">
                          Email: {user.email}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Posts</h2>
            {Isloading ? (
              <p className="text-center">Loading...</p>
            ) : (
<div className="space-y-6">
  {Data.map((post, index) => {
    return (
      <div
        key={index}
        className="flex flex-col md:flex-row items-center p-6 border border-gray-200 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      >
        <img
          className="w-24 h-24 rounded-lg object-cover mr-6"
          src={
            post.postImage ||
            "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
          }
          alt="User Avatar"
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
          <p className="text-gray-600">{post.description}</p>
        </div>
      </div>
    );
  })}
</div>

            )}
          </section>
        )}
      </main>

      <ToastContainer />
    </div>
  );
}
