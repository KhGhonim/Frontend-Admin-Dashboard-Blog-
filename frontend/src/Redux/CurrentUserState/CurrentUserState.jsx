import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function CurrentUserState() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/auth/login" />;
}
