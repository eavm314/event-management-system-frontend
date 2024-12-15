import { QuestionForm } from "../models/questionModel";

export const LOGIN_FORM: QuestionForm[] = [
  {
    type: "text",
    placeHolder: "Usuario (Código UPB)",
    name: "userCode",
    value: "userCode",
    errorsQuestions: [
      {
        id: "userCode",
        type: "codeError",
        message: "El código es invalido",
        active: true
      }
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "password",
    placeHolder: "Contraseña",
    name: "password",
    value: "password",
    errorsQuestions: [
      {
        id: "password",
        type: "lengthError",
        message: "La contraseña debería tener al menos 8 caracteres",
        active: true,
      }
    ],
    typeInput: "normal",
    selectOptionList: []
  }
];