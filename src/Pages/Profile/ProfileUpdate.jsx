import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../FirebaseConfig/FirebaseConfig";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../Redux/userSlice";
import { toast, ToastContainer } from "react-toastify";

export default function ProfileUpdate() {
  // @ts-ignore
  const {
    currentUser,

    error: userError,
    // @ts-ignore
  } = useSelector((state) => state.user);
  const [Image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const ImageInputRef = useRef(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [error, seterror] = useState(null);
  const [formData, setFormData] = useState({});
  const [UpdateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [loading, setloading] = useState(false);
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  // When the user clicks on the image it will open the file explorer to select an image from their device and store it in the state
  const ImagePicker = (eo) => {
    let file = eo.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (UpdateUserSuccess || error || userError) {
        setUpdateUserSuccess(null);
        seterror(null);
      }
    }, 3000);
  }, [UpdateUserSuccess, error, userError]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // When the image is uploaded it will be uploaded to the server and will be stored in the database
  useEffect(() => {
    if (Image) {
      UploadImageHandler();
    }
  }, [Image]);

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
          setFormData({ ...formData, profilePicture: downloadURL });

          // Set the uploading state to false
          setImageFileUploading(false);
        });
      }
    );
  };

  // This function handles the submission of the form
  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setloading(true);
    // Send a POST request to the server to update the user's profile
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("Please fill all the fields");
      setloading(false);
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      setloading(false);
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(
        `${apiUrl}/api/update/${currentUser._id || currentUser.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
        setloading(false);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(data.message);
        toast.success("Profile updated successfully");
        setloading(false);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error.message);
      setloading(false);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen  flex flex-col items-center py-5 md:py-10">
      <ToastContainer />
      {/* Profile Header */}
      <div className="w-full max-w-4xl p-6 bg-[--background-color] rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              ref={ImageInputRef}
              hidden
              onChange={ImagePicker}
              type="file"
            />
            <div
              onClick={() => ImageInputRef.current.click()}
              className="cursor-pointer"
            >
              <img
                src={
                  ImageUrl ||
                  currentUser?.profilePicture ||
                  currentUser?.user?.profilePicture
                }
                alt={currentUser?.name || currentUser?.user?.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
              />
            </div>
            {imageFileUploadProgress && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <p className="text-[--background-color] font-semibold">
                  {imageFileUploadProgress}%
                </p>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl capitalize font-bold text-[--text-color]">
              {currentUser?.name || currentUser?.user?.name}
            </h1>
            <p className=" text-[--text-color] capitalize text-sm">
              {currentUser?.email || currentUser?.user?.email}
            </p>
            <p className=" text-[--text-color] italic mt-1">
              "Welcome back! Ready to update your profile?"
            </p>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info Section */}
        <div className="p-6 bg-[--background-color] rounded-xl shadow-md">
          <h2 className="text-xl font-bold  text-[--text-color] mb-4">
            Personal Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={currentUser?.name || currentUser?.user?.name}
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-3 border text-[--input-text-color] rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={currentUser?.email || currentUser?.user?.email}
                placeholder="Email"
                onChange={handleChange}
                className="w-full p-3 border text-[--input-text-color] rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="New Password"
                onChange={handleChange}
                className="w-full p-3 border text-[--input-text-color] rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || imageFileUploading}
              className="w-full bg-indigo-500  text-white py-3 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
            >
              {loading ? "Updating..." : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
