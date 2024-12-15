"use client";
import React from "react";

interface Props {
  isChecked: boolean;
  textCheckBox: string;
  onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckButton = ({ isChecked, textCheckBox, onChangeAction }: Props) => {
  return (
    <div className="flex flex-row mb-3">
      <div className="flex justify-center items-center h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChangeAction}
          className="w-4 h-4 border border-gray-300 rounded outline-none
        bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600
        dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
      </div>
      <label className="ml-2 font-medium text-[#111]">
        {textCheckBox}
      </label>
    </div>
  );
};

export default CheckButton;
