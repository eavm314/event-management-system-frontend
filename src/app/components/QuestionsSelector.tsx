import React from "react";
import { SelectOption } from "../models/selectOptionModel";

interface Props {
  optionsSelect?: SelectOption[];
}

const QuestionSelector = ({ optionsSelect }: Props) => {
  return (
    <>
      {optionsSelect !== undefined && (
        <select
          className="rounded-md p-2 m-3 placeholder:italic font-medium text-black outline-none"
          name="choice"
        >
          {optionsSelect.map((item) => (
            <option
              key={item.id}
              id={String(item.id)}
              value={item.value}
              className="text-base font-medium"
            >
              {item.value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default QuestionSelector;
