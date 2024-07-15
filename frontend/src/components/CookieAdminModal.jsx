import { useDispatch } from "react-redux";
import { signoutSuccess } from "../Redux/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CookieAdminModal() {
  const [CokkieConsest, setCokkieConsest] = useState(true);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setCokkieConsest(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setCokkieConsest(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    dispatch(signoutSuccess());
    nevigate("/auth/login");
    setCokkieConsest(false);
  };

  return (
    <div
      className={`${
        CokkieConsest ? "block" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      id="cookie-modal"
    >
      <div className=" p-6 rounded-lg shadow-lg max-w-md w-full bg-white text-black">
        <h2 className="text-xl font-semibold mb-4">Cookie Consent</h2>
        <p className="text-muted-foreground mb-6">
          This website uses cookies to determine if you are a user or an admin
          to show all the website routes.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            id="accept-cookies"
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            id="decline-cookies"
            className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-lg"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
