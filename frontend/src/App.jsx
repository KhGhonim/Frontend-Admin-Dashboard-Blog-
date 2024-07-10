import { useState } from "react";
import Header from "../src/components/Header";
import { Outlet } from "react-router-dom";
import DrawerForMobiles from "./components/Drawers/DrawerForMobiles";
import DrawerForPC from "./components/Drawers/DrawerForPC";

function App() {
  const [DarkLightMode, setDarkLightMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  return (
    <div className="min-h-screen relative text-[--text-color] ">
      {DarkLightMode !== "light" ? (
        <div className="fixed top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      ) : (
        <div className="fixed top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
        </div>
      )}
      <Header
        setDarkLightMode={setDarkLightMode}
        DarkLightMode={DarkLightMode}
      />
      <DrawerForPC />
      <Outlet />
      <DrawerForMobiles />
    </div>
  );
}

export default App;
