"use client";
import React from "react";
import QuestionList from "./QuestionList";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { ErrorForm, QuestionForm } from "../models/questionModel";
import InteractiveSectionPrimaryForm from "./InteractiveSectionPrimaryForm";
import { SelectOption } from "../models/selectOptionModel";

interface Props {
  formTitle: string;
  listOfQuestions: QuestionForm[];
  checkButtonText?: string;
  buttonText: string;
  actionButton: () => void;
  textLeft?: string;
  textRight?: string;
  textLink?: string;
  actionLink?: () => void;
  existCheckBox: boolean;
  isChecked?: boolean;
  onChangeAction?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  existLink: boolean;
  registerPart: UseFormRegister<FieldValues>;
  onHandleSumbit: any;
  typeButton: "button" | "submit" | "reset" | undefined;
  errorList: ErrorForm[];
}

const PrincipalModelForm = ({
  formTitle,
  listOfQuestions,
  checkButtonText,
  buttonText,
  actionButton,
  textLeft,
  textRight,
  textLink,
  actionLink,
  existCheckBox,
  isChecked,
  onChangeAction,
  existLink,
  registerPart,
  onHandleSumbit,
  typeButton,
  errorList,
}: Props) => {
  return (
    <form
      onSubmit={onHandleSumbit}
      className="flex flex-col p-5 rounded-md bg-[#d9d9d9b2] w-[500px]"
    >
      <h1 className="w-max text-left text-3xl font-sans drop-shadow text-black font-medium">
        {formTitle}
      </h1>
      <QuestionList
        listOfQuestions={listOfQuestions}
        register={registerPart}
        errorsList={errorList}
      />
      <InteractiveSectionPrimaryForm
        checkButtonText={checkButtonText || ""}
        textButton={buttonText}
        actionButton={actionButton}
        textLeft={textLeft || ""}
        textRight={textRight || ""}
        textLink={textLink || ""}
        actionLink={actionLink || function () {}}
        existCheckBox={existCheckBox}
        isChecked={isChecked || false}
        onChangeAction={
          onChangeAction ||
          function (event: React.ChangeEvent<HTMLInputElement>) {}
        }
        existLink={existLink}
        typeButton={typeButton}
      />
    </form>
  );
};

export default PrincipalModelForm;
