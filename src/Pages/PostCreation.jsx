import {
  getDownloadURL,
  getStorage,
  ref,
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
  const apiUrl = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${apiUrl}/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(PostFormData),
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

  const PostPublishModalref = useRef(null);
  useEffect(() => {
    // Event handler for clicking outside the SignUp modal
    const HandleModelCloser = (eo) => {
      // Check if the click is not inside the SignUp div
      if (
        PostPublishModalref.current &&
        !PostPublishModalref.current.contains(eo.target)
      ) {
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
<div className="min-h-screen  p-6 sm:p-8">
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-2xl">
    <div className="flex justify-between items-center mb-6 flex-wrap">
      <h1 className="text-3xl font-semibold text-gray-800 flex-grow sm:flex-none mb-4 sm:mb-0">Welcome Admin!</h1>
      <form
        onSubmit={PostCreationHandler}
        className="space-x-4 flex gap-4 justify-center items-center flex-wrap"
      >
        <Link
          to="/"
          className="py-2 px-4 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={imageFileUploading || Isloading}
          className="py-2 px-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
        >
          Save
        </button>
      </form>
    </div>

    {error && <p className="text-red-600 text-center">{error}</p>}

    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Start the Journey!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="catagory"
            className="w-full p-4 border-2 text-[--input-text-color] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="" disabled>Select category</option>
            <option value="Technology">Technology</option>
            <option value="Politics">Politics</option>
            <option value="Sport">Sport</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">SEO & Social Sharing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Post Title <span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleChange}
            id="title"
            type="text"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Post Title"
          />

          <label className="block text-sm font-medium text-gray-700">
            Post Author <span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleChange}
            id="author"
            type="text"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Author Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image <span className="text-red-500">*</span>
          </label>
          <input
            ref={ImageInputRef}
            hidden
            onChange={ImagePicker}
            type="file"
          />
          <div
            onClick={() => ImageInputRef.current.click()}
            className="relative cursor-pointer w-full h-72 sm:h-80 rounded-lg overflow-hidden shadow-xl"
          >
            {imageFileUploadProgress && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-50 text-white">
                <span>{imageFileUploadProgress}%</span>
              </div>
            )}
            <img
              className={`w-full h-full object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 ? 'opacity-60' : ''}`}
              src={ImageUrl}
              alt="Category"
            />
          </div>
        </div>
      </div>
      {imageFileUploadError && (
        <div className="mt-4 bg-red-500 text-white p-4 rounded-lg text-center">
          {imageFileUploadError}
        </div>
      )}
    </div>

    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Post Description <span className="text-red-500">*</span>
      </label>
      <ReactQuill
        theme="snow"
        placeholder="Write something..."
        className="h-72 sm:h-80 mb-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(value) => setPostFormData({ ...PostFormData, content: value })}
      />
    </div>
  </div>

  {/* Modal for Post Success */}
  <div className={`${PostState ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
    <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-lg w-full transform transition-all duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-indigo-600">Post Successfully Published!</h2>
        <button
          className="hover:scale-90"
          onClick={() => setPostState(false)}
        >
          <CgClose size={20} />
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600 flex items-center justify-center gap-2">
        Your post has been published successfully! <FaCheckCircle color="green" size={20} />
      </p>
    </div>
  </div>
</div>

  );
}
