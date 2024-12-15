"use client"

import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { Option } from "../models/selectOptionModel";

interface Props {
  options: Option[],
  label?: string,
  selectedOptions: string[],
  setSelectedOptions: Dispatch<SetStateAction<string[]>>,
  emptyMessage: string,
}

const SelectInput = ({ options, label, selectedOptions, setSelectedOptions, emptyMessage }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleCheckboxChange = (opcion: string) => {
    if (selectedOptions.includes(opcion)) {
      setSelectedOptions(selectedOptions.filter(item => item !== opcion));
    } else {
      setSelectedOptions([...selectedOptions, opcion]);
    }
  };
  return (
    <div className="rounded-md p-2 text-black bg-[#F6F6F6E5] w-full">
      <button type="button"
        className="w-full flex justify-between outline-none"
        // onClick={() => setShowOptions(!showOptions)}
        >
        {label}
        {/* <div>{showOptions ? "A" : "V"}</div> */}
      </button>

      <div className="flex flex-col px-5 max-h-24 overflow-y-scroll">
        {!options?.length && <label>{emptyMessage}</label>}
        {options.map((option, index) => (
          <label key={index}
            className="flex justify-between">
            {option.label}
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
          </label>
        ))}
      </div>

    </div>
  )
}

export default SelectInput