import { CgUserList } from "react-icons/cg";
import { FaComments } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:h-screen ">
      <div className="flex w-full p-4  space-y-4">
        <div className="flex flex-row w-screen md:justify-evenly md:items-center max-md:flex-col flex-1 space-y-4 shadow-xl pb-10">
          <div className="p-6 rounded-lg w-64 max-sm:w-full  border border-gray-50  shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL USERS</h2>
              <p className="text-2xl font-bold">19</p>
              <p className="text-primary">↑ 11 Last month</p>
            </div>
            <CgUserList size={35} />
          </div>
          <div className="p-6 w-64 max-sm:w-full  rounded-lg border border-gray-50  shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL COMMENTS</h2>
              <p className="text-2xl font-bold">14</p>
              <p className="text-primary">↑ 2 Last month</p>
            </div>
            <FaComments size={35} />
          </div>
          <div className="p-6 w-64 max-sm:w-full  rounded-lg  border border-gray-50 shadow-xl flex justify-between items-center">
            <div>
              <h2 className="">TOTAL POSTS</h2>
              <p className="text-2xl font-bold">14</p>
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
                <tr>
                  <td>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://placehold.co/32x32"
                      alt="User Image 1"
                    />
                  </td>
                  <td>fendimohamed2843</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://placehold.co/32x32"
                      alt="User Image 2"
                    />
                  </td>
                  <td>karthikeyaandhoju8665</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://placehold.co/32x32"
                      alt="User Image 3"
                    />
                  </td>
                  <td>random</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://placehold.co/32x32"
                      alt="User Image 4"
                    />
                  </td>
                  <td>Harsh Chaudhary</td>
                </tr>
                <tr>
                  <td>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://placehold.co/32x32"
                      alt="User Image 5"
                    />
                  </td>
                  <td>sahandghavidel4276</td>
                </tr>
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
                <tr>
                  <td>nice job</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>nice job bro</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>
                    Congratulations! You have successfully set up Tailwind CSS
                    with Vite, providing a blazing fast and efficient...
                  </td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>
                    Want to learn HTML, CSS and JavaScript by building fun and
                    engaging projects?
                  </td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>w</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
