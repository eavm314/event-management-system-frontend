import React from "react";
import CheckButton from "./CheckButton";
import PrimaryButton from "./PrimaryButton";
import LinkRedirector from "./LinkRedirector";

interface Props {
  checkButtonText?: string;
  textButton: string;
  actionButton: () => void;
  textLeft?: string;
  textRight?: string;
  textLink?: string;
  actionLink?: () => void;
  existCheckBox?: boolean;
  isChecked?: boolean;
  onChangeAction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  existLink?: boolean;
  typeButton: "button" | "submit" | "reset" | undefined;
}

const InteractiveSectionPrimaryForm = ({
  textButton,
  actionButton,
  textLeft,
  textRight,
  textLink,
  actionLink,
  existCheckBox,
  checkButtonText,
  isChecked,
  onChangeAction,
  existLink,
  typeButton,
}: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {existCheckBox && (
        <CheckButton
          textCheckBox={checkButtonText || ""}
          isChecked={isChecked || false}
          onChangeAction={
            onChangeAction ||
            function (event: React.ChangeEvent<HTMLInputElement>) {}
          }
        />
      )}
      <PrimaryButton
        textButton={textButton}
        action={actionButton}
        className="w-3/4"
        typeButton={typeButton}
      />
      {existLink && (
        <LinkRedirector
          textLeft={textLeft || ""}
          textRight={textRight || ""}
          textLink={textLink || ""}
          action={actionLink || function () {}}
        />
      )}
    </div>
  );
};

export default InteractiveSectionPrimaryForm;
