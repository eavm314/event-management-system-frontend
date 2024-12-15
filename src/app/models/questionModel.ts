import { FieldValues } from "react-hook-form";
import { SelectOption } from "./selectOptionModel";

export interface QuestionForm {
  type: string;
  placeHolder: string;
  name: string;
  value: string;
  errorsQuestions: ErrorForm[];
  typeInput: string;
  selectOptionList?: SelectOption[];
}

export interface ErrorForm {
  id: string;
  active: boolean;
  type: string;
  message: string;
}
