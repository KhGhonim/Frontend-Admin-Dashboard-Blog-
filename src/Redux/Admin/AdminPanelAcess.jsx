import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function AdminPanelAcess() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (
      
      currentUser.isAdmin === false ||
      currentUser.user.isAdmin === false
    ) {
      setNotification("Access denied: You are not an admin.");
    }
  }, [currentUser, currentUser.isAdmin]);


  return (
    <div>
      {(currentUser && currentUser.isAdmin) ||
      (currentUser && currentUser.user.isAdmin) ? (
        <Outlet />
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl font-bold text-red-500">{notification}</p>
        </div>
      )}
    </div>
  );
}
