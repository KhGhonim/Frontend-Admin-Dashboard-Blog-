import { useEffect, useState } from "react";
import Header from "../src/components/Header";
import { Outlet } from "react-router-dom";
import DrawerForMobiles from "./components/Drawers/DrawerForMobiles";
import DrawerForPC from "./components/Drawers/DrawerForPC";
import Footer from "../src/components/Footer";
import CookieAdminModal from "../src/components/CookieAdminModal";
import { ToastContainer } from "react-toastify";

function App() {
  const [DarkLightMode, setDarkLightMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // @ts-ignore
  const ApiURL= import.meta.env.VITE_API_URL

  const refreshToken = async () => {
    try {
      const res = await fetch(`${ApiURL}/api/refreshToken`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        window.location.href = "/auth/login";
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken(); // Refresh token every 59 minutes
    }, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen relative text-[--text-color] ">
      {DarkLightMode !== "light" ? (
        <div className="fixed top-0 -z-[10] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      ) : (
        <div className="fixed top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
        </div>
      )}
      <Header
        setDarkLightMode={setDarkLightMode}
        DarkLightMode={DarkLightMode}
      />
      <ToastContainer />
      <DrawerForPC />
      <Outlet />
      <CookieAdminModal />
      <DrawerForMobiles />
      <Footer />
    </div>
  );
}

export default App;
