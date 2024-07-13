import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => {
  return (
    <input
      type="text"
      disabled={input.name === "id" ? true : false}
      required
      {...input}
      {...rest}
    />
  );
};

export default TextInput;
