"use client";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { SelectOption } from "../models/selectOptionModel";
import { ErrorForm } from "../models/questionModel";
import ErrorMessageForm from "./ErrorMessageForm";

interface Props {
  id: string;
  placeHolder: string;
  register: UseFormRegister<FieldValues>;
  typeQuestion: string;
  typeInput: string;
  selectOptionsList?: SelectOption[];
  errors: ErrorForm[];
}

const Question = ({
  id,
  placeHolder,
  register,
  typeQuestion,
  typeInput,
  selectOptionsList,
  errors,
}: Props) => {
  const activeErrors =
    [...errors.filter((error) => error.id === id && error.active)] || [];
  return (
    <>
      {activeErrors.length > 0 && (
        <div className="flex flex-col p-1 m-1">
          {activeErrors.map((error: ErrorForm, index: number) => (
            <ErrorMessageForm key={index + 1} text={error.message} />
          ))}
        </div>
      )}
      {typeInput === "normal" && (
        <input
          className="rounded-md p-2 m-3 placeholder:italic font-medium text-black outline-none"
          type={typeQuestion}
          placeholder={placeHolder}
          {...register(id, {
            required: true,
          })}
          required={true}
        />
      )}
      {typeInput === "textarea" && (
        <textarea
          className="rounded-md p-2 m-3 placeholder:italic font-medium text-black outline-none h-[100px] resize-none"
          placeholder={placeHolder}
          {...register(id, {
            required: true,
          })}
          required={true}
        />
      )}
      {typeInput === "select" && (
        <select
          {...register(id, {
            required: true,
          })}
          className="rounded-md p-2 m-3 placeholder:italic font-medium text-black outline-none"
        >
          {selectOptionsList?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Question;
