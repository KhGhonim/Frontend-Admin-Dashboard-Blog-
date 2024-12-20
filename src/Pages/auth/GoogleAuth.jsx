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
import { toast } from "react-toastify";
export default function GoogleAuth() {
  // @ts-ignore

  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation().pathname;
  const HandleGoogleAuth = async (eo) => {
    eo.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = resultsFromGoogle.user;

      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email: email,
          googlePhotoUrl: photoURL,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        toast.error("Failed to authenticate");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <button
      type="submit"
      onClick={HandleGoogleAuth}
      className="w-full py-3 bg-teal-600 flex items-center justify-center gap-1 text-white rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 focus:outline-none"
      >
      {`${location === "/auth/register" ? "Sign Up With" : "Sign In With"}`}{" "}
      <CgGoogle  size={13} />
    </button>
  );
}
