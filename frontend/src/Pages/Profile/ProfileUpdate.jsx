import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../FirebaseConfig/FirebaseConfig";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../Redux/userSlice";

export default function ProfileUpdate() {
  // @ts-ignore
  const {
    currentUser,
    loading,
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
  const dispatch = useDispatch();
  // When the user clicks on the image it will open the file explorer to select an image from their device and store it in the state
  const ImagePicker = (eo) => {
    let file = eo.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };

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
    // Send a POST request to the server to update the user's profile

    try {
      dispatch(updateStart());

      const res = await fetch(
        `http://localhost:5000/api/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        seterror(data);
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  return (
    <div className="relative w-screen h-dvh">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2128959116/display_1500/stock-vector-abstract-waving-particle-technology-background-design-abstract-wave-moving-dots-flow-particles-hi-2128959116.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 text-black rounded-lg shadow-md max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4 text-white ">Profile</h1>
        <input ref={ImageInputRef} hidden onChange={ImagePicker} type="file" />
        <div
          onClick={() => ImageInputRef.current.click()}
          className="relative mb-6"
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}

          <img
            className={`w-24 h-24 rounded-full object-cover border-4 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            } `}
            src={ImageUrl || currentUser?.profilePicture}
            alt={currentUser?.name}
          />
        </div>

        {imageFileUploadError && (
          <h1 className="bg-red-500 p-3 text-white mb-1 rounded-xl text-center">
            {imageFileUploadError}
          </h1>
        )}
        <div className="w-full mb-4">
          <input
            type="text"
            id="name"
            defaultValue={currentUser?.name}
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <div className="w-full mb-4">
          <input
            defaultValue={currentUser?.email}
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <div className="w-full mb-6">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
        </div>
        <button
          disabled={loading || imageFileUploading}
          type="submit"
          className="w-full bg-gray-950 p-3 rounded-lg hover:bg-black/80 focus:outline-none focus:ring-2 text-white"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {userError && <p className="text-red-500">{userError}</p>}
      {error && (
        <p className="text-gray-50 w-full p-3 bg-red-500 text-center capitalize">
          {error}
        </p>
      )}
    </div>
  );
}
