import { QuestionForm } from "../models/questionModel";
import { ERROR_TYPES } from "./errorTypesData";

export const REGISTER_ACTIVITY_FORM: QuestionForm[] = [
  {
    type: "text",
    placeHolder: "Nombre de la actividad",
    name: "nameEvent",
    value: "nameEvent",
    errorsQuestions: [
      {
        id: 'nameEvent',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "El título debería tener entre 1 a 255 caracteres de largo"
      },
      {
        id: 'nameEvent',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "El título no debería tener espacios al inicio ni al final"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "textarea",
    placeHolder: "Descripción de la actividad",
    name: "descrEvent",
    value: "descrEvent",
    errorsQuestions: [
      {
        id: 'descrEvent',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "La descripción debería tener entre 1 a 255 caracteres de largo"
      }
    ],
    typeInput: "textarea",
    selectOptionList: []
  },
  {
    type: "select",
    placeHolder: "area",
    name: "areaEvent",
    value: "areaEvent",
    errorsQuestions: [],
    typeInput: "select",
    selectOptionList: [
      {
        "id": "AREA01",
        "value": "Cultura"
      },
      {
        "id": "AREA02",
        "value": "Deportes"
      },
      {
        "id": "AREA03",
        "value": "Salud"
      },
      {
        "id": "AREA04",
        "value": "Voluntariado"
      },
      {
        "id": "AREA05",
        "value": "Desarrollo Estudiantil"
      },
      {
        "id": "AREA06",
        "value": "General"
      },
    ]
  },
  {
    type: "date",
    placeHolder: "Fecha de inicio",
    name: "initDate",
    value: "initDate",
    errorsQuestions: [
      {
        id: 'initDate',
        active: false,
        type: ERROR_TYPES.incorrectDateError,
        message: "La fecha no puede encontrarse antes"
      },
      {
        id: 'initDate',
        active: false,
        type: ERROR_TYPES.timeDateError,
        message: "La fecha de inicio debería encontrarse entre 14 y 60 días después"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "date",
    placeHolder: "Fecha de finalización",
    name: "endDate",
    value: "endDate",
    errorsQuestions: [
      {
        id: 'endDate',
        active: false,
        type: ERROR_TYPES.incorrectDateError,
        message: "La fecha no puede encontrarse antes"
      },
      {
        id: 'endDate',
        active: false,
        type: ERROR_TYPES.timeDateError,
        message: "La fecha de cierre debería encontrarse entre 14 y 60 días después"
      },
      {
        id: 'endDate',
        active: false,
        type: ERROR_TYPES.differenceBetweenDatesError,
        message: "La fecha de cierre debería encontrarse después o el mismo día que la de inicio"
      }
    ],
    typeInput: "normal",
    selectOptionList: []
  }
];