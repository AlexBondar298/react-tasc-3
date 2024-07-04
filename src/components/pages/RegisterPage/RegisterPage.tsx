import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../formAuthorization/Form";

import { useDispatch} from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { addUser } from "../../../redux/slices/user/sliceUser";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = "Sign Up";
  const title_2 = "Sign In";
  const navigationPath = "/login";

  const handleRegister = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(addUser({ email: user.email, token: user.uid, id: user.uid }));
      navigate("/");
    } catch (error: any) {
      console.error("Error registering user:", error.code, error.message);
    }
  };

  return (
    <div>
      <Form
        title={title}
        title_2={title_2}
        navigationPath={navigationPath}
        handleClick={(email, password) => handleRegister(email, password)}
      />
    </div>
  );
};

export default RegisterPage;
