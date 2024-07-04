import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../formAuthorization/Form";

import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { addUser } from "../../../redux/slices/user/sliceUser";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = "Sign In";
  const title_2 = "Sign Up";
  const navigationPath = "/register";

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(addUser({ email: user.email, token: user.uid, id: user.uid }));
      navigate("/");
    } catch (error: any) {
      console.error("Error rmessage:", error.message);
      console.error("Error code:", error.code);
      if (error.message.includes("auth/invalid-credential"))
        alert("Неверный логин или пароль");
    }
  };

  return (
    <div>
      <Form
        title={title}
        title_2={title_2}
        navigationPath={navigationPath}
        handleClick={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
