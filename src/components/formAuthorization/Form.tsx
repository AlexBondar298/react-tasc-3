import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Form.module.scss";

interface FormProps {
  title: string;
  title_2: string;
  navigationPath: string;
  handleClick: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({
  title,
  title_2,
  navigationPath,
  handleClick,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className={classes.authorization}>
        <div className={classes.form__authorization}>
          <div className={classes.header__form}>
            <h3 className={classes.title__form}>{title}</h3>
            <button
              className={classes.title__formBtn}
              onClick={() => navigate(`${navigationPath}`)}
            >
              {title_2}
            </button>
          </div>

          <div className={classes.input__form}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
            />
            <button
              className={classes.button}
              onClick={() => handleClick(email, password)}
            >
              {title}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Form;
