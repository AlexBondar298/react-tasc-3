import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const DateInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => {
  return <input type="date" required {...input} {...rest} />;
};

export default DateInput;
