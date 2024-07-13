import React, { useState, ChangeEvent } from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<number | string, any>;

const TelInput: React.FC<Props> = ({ input, meta, ...rest }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsValid(/^[0-9]+$/.test(value) && value.length === 10);
    input.onChange(value);
  };

  return (
    <div>
      <input
        type="tel"
        {...input}
        {...rest}
        required
        onBlur={handleChange}
        style={{ color: isValid ? "black" : "red" }}
      />
      {!isValid && <span style={{ color: "red" }}>Некорректный телефон</span>}
    </div>
  );
};

export default TelInput;
