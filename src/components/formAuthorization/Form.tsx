import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
  title: string;
  title_2: string;
  navigationPath:string;
  handleClick: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({ title, title_2, navigationPath, handleClick }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="authorization">
      <div className="form__authorization">
        <div className="header__form">
          <h3 className="title__form">{title}</h3>
          <button
            className="title__form-btn"
            onClick={() => navigate(`${navigationPath}`)}
          >
            {title_2}
          </button>
        </div>

        <div className="input__form">
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
          <button onClick={() => handleClick(email, password)}>{title}</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
