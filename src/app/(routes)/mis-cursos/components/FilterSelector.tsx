import React from "react";
import { SelectOption } from "../../../models/selectOptionModel";

interface Props {
  stateSelection: (value: string) => void;
  options: SelectOption[];
}

const FilterSelector = ({ stateSelection, options }: Props) => {
  return (
    <>
      <select
        onChange={(event) => stateSelection(event.target.value)}
        className="rounded-md p-2 m-3 placeholder:italic font-medium text-black outline-none w-max"
      >
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.value}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterSelector;
