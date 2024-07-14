import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function AdminPanelAcess() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.isAdmin === false) {
      setNotification("Access denied: You are not an admin.");
    } else {
      setNotification(""); // Clear notification if user is admin
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser && currentUser.isAdmin === true ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold text-red-500">{notification}</p>
        </div>
      )}
    </div>
  );
}
