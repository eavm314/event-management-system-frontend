import React from "react";

interface Props {
  text: string;
}

const ErrorMessageForm = ({ text }: Props) => {
  return (
    <p className="text-red-500 text-sm font-mono font-semibold">* {text}</p>
  );
};

export default ErrorMessageForm;
