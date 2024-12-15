import { QuestionForm } from "../models/questionModel";
import { ERROR_TYPES } from "./errorTypesData";

export const REGISTER_FORM: QuestionForm[] = [
  {
    type: "text",
    placeHolder: "Nombres",
    value: "names",
    name: "names",
    errorsQuestions: [
      {
        id: 'names',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "El nombre debería estar compuesto al menos por 1 letra"
      },
      {
        id: 'names',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "Los nombres no deberian tener espacios al inicio ni al final"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "text",
    placeHolder: "Apellidos",
    value: "lastNames",
    name: "lastNames",
    errorsQuestions: [
      {
        id: 'lastNames',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "El apellido debería estar compuesto al menos por 1 letra"
      },
      {
        id: 'lastNames',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "Los lastNames no deberian tener espacios al inicio ni al final"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "text",
    placeHolder: "Usuario (Código UPB)",
    value: "code",
    name: "code",
    errorsQuestions: [
      {
        id: 'code',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "El código debería estar compuesto de 5 digitos"
      },
      {
        id: 'code',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "El coformatErrordigo debería ser numérico"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "email",
    placeHolder: "Correo electrónico",
    name: "email",
    value: "email",
    errorsQuestions: [
      {
        id: 'email',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "El email no tiene un formato valido"
      },
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
        id: 'password',
        active: false,
        type: ERROR_TYPES.lengthError,
        message: "La contraseña debería tener entre 8 a 16 caracteres de largo"
      },
      {
        id: 'password',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "La contraseña (sin espacios) debería contener al menos 1 letra mins, 1 letra mays, 1 numero"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "password",
    placeHolder: "Repita la contraseña",
    name: "repeatedPassword",
    value: "repeatedPassword",
    errorsQuestions: [
      {
        id: 'repeatedPassword',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "Las contraseñas no coinciden"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "text",
    placeHolder: "Número celular",
    name: "phone",
    value: "phone",
    errorsQuestions: [
      {
        id: 'phone',
        active: false,
        type: ERROR_TYPES.formatError,
        message: "El numero de telefono debería tener un formato valido (whatsapp)"
      },
    ],
    typeInput: "normal",
    selectOptionList: []
  },
  {
    type: "select",
    placeHolder: "rol",
    name: "rol",
    value: "rol",
    errorsQuestions: [],
    typeInput: "select",
    selectOptionList: [
      {
        "id": "STD01",
        "value": "Estudiante"
      },
      {
        "id": "DOC01",
        "value": "Docente"
      },
      {
        "id": "ADM01",
        "value": "Administrador"
      },
      {
        "id": "COO01",
        "value": "Coordinador"
      },
    ]
  }
];