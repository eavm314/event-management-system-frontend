"use client";
import React from "react";
import Question from "./Question";
import { ErrorForm, QuestionForm } from "../models/questionModel";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  listOfQuestions: QuestionForm[];
  errorsList: ErrorForm[];
  register: UseFormRegister<FieldValues>;
}

const QuestionList = ({ listOfQuestions, errorsList, register }: Props) => {
  return (
    <div className="flex flex-col p-3 m-1">
      {listOfQuestions.map((item) => (
        <Question
          key={item.placeHolder}
          id={item.value}
          placeHolder={item.placeHolder}
          register={register}
          typeQuestion={item.type}
          typeInput={item.typeInput}
          selectOptionsList={
            item.selectOptionList && item.selectOptionList?.length !== 0
              ? item.selectOptionList
              : undefined
          }
          errors={errorsList}
        />
      ))}
    </div>
  );
};

export default QuestionList;
