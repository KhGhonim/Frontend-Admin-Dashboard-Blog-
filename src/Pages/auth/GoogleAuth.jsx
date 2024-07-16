import { CgGoogle } from "react-icons/cg";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../../FirebaseConfig/FirebaseConfig.js";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Redux/userSlice.js";
export default function GoogleAuth() {
  // @ts-ignore

  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const HandleGoogleAuth = async (eo) => {
    eo.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultsFromGoogle.user;

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email: email,
          googlePhotoUrl: photoURL,
        }),
        credentials: "include",
      });
      console.log(res);
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        throw new Error(data.error || "Failed to authenticate");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <button
      type="submit"
      onClick={HandleGoogleAuth}
      className=" w-full p-3 text-center rounded-md bg-teal-700 transition-colors duration-300 ease-in-out hover:bg-teal-800 text-white flex justify-center items-center gap-4"
    >
      <CgGoogle /> {`${location === "/auth/register" ? "Sign Up" : "Sign In"}`}
    </button>
  );
}
