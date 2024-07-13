import React, { useState, ChangeEvent } from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const EmailInput: React.FC<Props> = ({ input, meta, ...rest }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsValid(value.includes("@"));
    input.onChange(value);
  };

  return (
    <div>
      <input
        type="email"
        {...input}
        {...rest}
        required
        onBlur={handleChange}
        style={{ color: isValid ? "black" : "red" }}
      />
      {!isValid && <span style={{ color: "red" }}>Некорректный email</span>}
    </div>
  );
};

export default EmailInput;
