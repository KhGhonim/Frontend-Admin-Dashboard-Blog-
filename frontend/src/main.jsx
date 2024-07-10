import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "../src/Pages/Dashboard.jsx";
import LandingPage from "../src/Pages/LandingPage.jsx";
import SigIn from "../src/Pages/auth/SigIn.jsx";
// @ts-ignore
import Register from "../src/Pages/auth/Register.jsx";
import Profile from "../src/Pages/Profile.jsx";
import Search from "../src/Pages/Search.jsx";
import PostCreation from "../src/Pages/PostCreation.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth/login" element={<SigIn />} />
      <Route path="/post/editor" element={<PostCreation />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
