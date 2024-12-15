import React from "react";

interface Props {
  textButton: string;
  action?: () => void;
  className?: string;
  typeButton: "button" | "submit" | "reset" | undefined;
}

const PrimaryButton = ({
  textButton,
  action,
  className,
  typeButton,
}: Props) => {
  return (
    <button
      onClick={action}
      type={typeButton}
      className={
        "border-black border-[1px] rounded-[5px] py-3 px-2 text-base font-medium " +
        (className ? className : "")
      }
    >
      {textButton}
    </button>
  );
};

export default PrimaryButton;
