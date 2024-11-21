import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useHandleRegister = () => {
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);
  const [SignUPerror, setSignUPerror] = useState(null);
  const navigate = useNavigate();
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  const HandleRegister = async (eo) => {
    eo.preventDefault();
    setloading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setloading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });
      if (!res.ok) {
        toast.error("Registration failed");
        setloading(false);
        setSignUPerror("Registration failed");
        return;
      } else {
        navigate("/auth/login");
        toast.success("Registration successful");
      }

      eo.target.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return {
    HandleRegister,
    name,
    setname,
    email,
    setemail,
    password,
    setpassword,
    confirmPassword,
    setconfirmPassword,
    loading,
    SignUPerror,
  };
};

export default useHandleRegister;
