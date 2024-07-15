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
import Profile from "./Pages/Profile/Profile.jsx";
import Search from "../src/Pages/Search.jsx";
import PostCreation from "../src/Pages/PostCreation.jsx";
import ForgotPW from "../src/Pages/ForgotPW.jsx";
import { Provider } from "react-redux";
import CurrentUserState from "../src/Redux/CurrentUserState/CurrentUserState.jsx";
import PostUpdate from "../src/Pages/PostUpadte.jsx";
import AdminPanelAcess from "../src/Redux/Admin/AdminPanelAcess.jsx";
import { PersistGate } from "redux-persist/integration/react";
import ProfileUpdate from "../src/Pages/Profile/ProfileUpdate.jsx";
// @ts-ignore
import { persistor, store } from "./Redux/store.js";
import Posts from "../src/Pages/Posts.jsx";
import Users from "../src/Pages/Users.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/auth/login" element={<SigIn />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/ForgotPW" element={<ForgotPW />} />

      {/* PrivateRoutes */}
      <Route element={<CurrentUserState />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Profile/update/:userId" element={<ProfileUpdate />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* AdminRoutes */}
      <Route element={<AdminPanelAcess />}>
        <Route path="/Posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post/editor" element={<PostCreation />} />
        <Route path="/post/update/:postId" element={<PostUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
