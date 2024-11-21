import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Redux/userSlice";

const useHandleLogin = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setloading] = useState(false);
  const nevigate = useNavigate();
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const HandleLogin = async (eo) => {
    eo.preventDefault();
    setloading(true);
    dispatch(signInStart());

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        setloading(false);
      } else {
        dispatch(signInSuccess(data));
        setloading(false);
        nevigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return {
    useHandleLogin,
    setemail,
    setpassword,
    HandleLogin,
    email,
    password,
    loading,
  };
};

export default useHandleLogin;
