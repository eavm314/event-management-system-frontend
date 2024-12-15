import React, { useEffect, useState } from "react";
import FilterSelector from "./FilterSelector";
import {
  AREA_LIST_SELECT_OPTIONS,
  MANAGEMENT_LIST_SELECT_OPTIONS,
  STATUS_LIST_SELECT_OPTIONS,
} from "../../../data/myActivityFilterData";

interface Props {
  setActivityType: (value: string) => void;
  setActivityManagement: (value: string) => void;
  setActivityState: (value: string) => void;
}

const HeaderMyCourses = ({
  setActivityType,
  setActivityManagement,
  setActivityState,
}: Props) => {
  return (
    <section className="flex flex-col justify-center items-center mt-5">
      <h2 className="text-xl font-medium">
        Filtrar actividades y eventos por:
      </h2>
      <div className="flex flex-row p-1 m-1 w-full justify-center">
        <FilterSelector
          stateSelection={setActivityType}
          options={AREA_LIST_SELECT_OPTIONS}
        />
        <FilterSelector
          stateSelection={setActivityManagement}
          options={MANAGEMENT_LIST_SELECT_OPTIONS}
        />
        <FilterSelector
          stateSelection={setActivityState}
          options={STATUS_LIST_SELECT_OPTIONS}
        />
      </div>
    </section>
  );
};

export default HeaderMyCourses;
