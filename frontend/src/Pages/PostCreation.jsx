import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../FirebaseConfig/FirebaseConfig";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function PostCreation() {
  // @ts-ignore

  const [PostFormData, setPostFormData] = useState({});
  const [Image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [error, seterror] = useState(null);
  const [Isloading, setIsloading] = useState(null);
  const [PostState, setPostState] = useState(null);
  const ImageInputRef = useRef(null);

  const ImagePicker = (eo) => {
    let file = eo.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };
  console.log(PostFormData);

  // This function handles the upload of the image to the Firebase storage
  const UploadImageHandler = () => {
    // Get the Firebase storage reference
    const storage = getStorage(app);

    // Generate a unique file name for the image
    const fileName = new Date().getTime() + Image.name;
    const storageRef = ref(storage, fileName);

    // Start the upload process
    const uploadTask = uploadBytesResumable(storageRef, Image);

    // Handle the state changes during the upload process
    uploadTask.on(
      "state_changed",
      // When the upload starts or progresses, update the progress state
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // Convert the progress to an integer and update the state
        setImageFileUploadProgress(progress.toFixed(0));
      },
      // If there is an error during the upload, handle the error and update the state
      (error) => {
        // Set the error message and clear the progress state
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);

        // Clear the image state
        setImage(null);
        setImageUrl(null);

        // Set the uploading state to false
        setImageFileUploading(false);
      },
      // When the upload is complete, get the download URL and update the state
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Set the image URL and update the form data
          setImageUrl(downloadURL);
          setPostFormData({ ...PostFormData, profilePicture: downloadURL });

          // Set the uploading state to false
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (Image) {
      UploadImageHandler();
    }
  }, [Image]);

  const handleChange = (event) => {
    setPostFormData({
      ...PostFormData,

      [event.target.id]: event.target.value,
    });
  };
  const PostCreationHandler = async (eo) => {
    eo.preventDefault();
    seterror(null);
    setIsloading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(PostFormData),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setIsloading(false);
        seterror(data.message);
        return;
      } else {
        setPostState(true);
        setIsloading(false);
        setPostFormData({});
        eo.target.reset();
        seterror(null);
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        seterror(null);
        setIsloading(false);
      }
    }, 5000);
  }, [error]);

  const PostPublishModalHandler = () => {
    setPostState(false);
  };

  const ref = useRef(null);
  useEffect(() => {
    // Event handler for clicking outside the SignUp modal
    const HandleModelCloser = (eo) => {
      // Check if the click is not inside the SignUp div
      if (ref.current && !ref.current.contains(eo.target)) {
        // Close the modal
        PostPublishModalHandler();
      }
    };

    // Add the event listener for clicking outside the SignUp modal
    document.addEventListener("mousedown", HandleModelCloser);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", HandleModelCloser);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="min-h-screen  p-6 pb-3 relative">
      <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow-xl mb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold">Welcome Admin!</h1>
          <form
            onSubmit={PostCreationHandler}
            className="space-x-2 flex gap-2 justify-center items-center"
          >
            <Link
              to="/"
              className="bg-gray-300 text-[#111827] cursor-pointer  py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={imageFileUploading || Isloading}
              className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out"
            >
              Save
            </button>
          </form>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Start the Journey!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="catagory"
                className="w-full p-2 border border-border rounded-lg text-black"
                defaultValue=""
                onChange={handleChange}
              >
                <option value="" disabled>
                  Categorize your post
                </option>
                <option value="Technology">Technology</option>
                <option value="Politics">Politics</option>
                <option value="Sport">Sport</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-sm font-medium mb-2">
                Post URL <span className="text-red-500">*</span>{" "}
              </label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-200 text-gray-500">
                  KGNEWS/
                </span>
                <input
                  onChange={handleChange}
                  id="url"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-r-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Post URL...."
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-4">SEO & Social Sharing</h2>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium pb-2">
                Post Title <span className="text-red-500">*</span>{" "}
              </label>
              <input
                onChange={handleChange}
                id="title"
                type="text"
                className="w-full p-2 border border-border rounded-lg text-black"
                placeholder="Your Post Title"
              ></input>

              <label className="block text-sm font-medium mb-2">
                Post Author <span className="text-red-500">*</span>{" "}
              </label>
              <input
                onChange={handleChange}
                id="author"
                type="text"
                className="w-full p-2 border border-border rounded-lg text-black"
                placeholder="Your Post Title"
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Category Image <span className="text-red-500">*</span>{" "}
              </label>
              <input
                ref={ImageInputRef}
                hidden
                onChange={ImagePicker}
                type="file"
              />
              <div
                onClick={() => ImageInputRef.current.click()}
                className="relative mb-6 w-56 h-56 md:w-96 md:h-96 cursor-pointer "
              >
                {imageFileUploadProgress && (
                  <CircularProgressbar
                    value={imageFileUploadProgress || 0}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={1}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileUploadProgress / 100
                        })`,
                      },
                      text: {
                        fill: "#1111",
                        fontSize: "16px",
                      },
                    }}
                  />
                )}
                <img
                  className={`w-full h-full rounded-full object-cover border-4 ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    "opacity-60"
                  }`}
                  src={ImageUrl}
                  alt={"category image"}
                />
              </div>
            </div>
          </div>
          {imageFileUploadError && (
            <h1 className="bg-red-500 p-3 text-white mb-1 rounded-xl text-center">
              {imageFileUploadError}
            </h1>
          )}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Post Description<span className="text-red-500">*</span>{" "}
            </label>

            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12"
              onChange={(value) => {
                setPostFormData({ ...PostFormData, content: value });
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={` ${
          PostState ? "block" : "hidden"
        } fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div
          ref={ref}
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg">
              Post successfully Puplished{" "}
            </h2>
            <button className="hover:scale-90">
              <CgClose
                className="cursor-pointer"
                onClick={() => {
                  setPostState(false);
                }}
                color="#000"
                size="20"
              />
            </button>
          </div>
          <p className="mt-4 text-muted-foreground flex justify-center items-center gap-2">
            Your post has been published successfully!{" "}
            <FaCheckCircle color="green" size={20} />{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
