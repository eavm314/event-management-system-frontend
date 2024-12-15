"use client";
import PrincipalModelForm from "@/src/app/components/PrincipalModelForm";
import ModalLoading from "@/src/app/modals/ModalLoading";
import ModalPage from "@/src/app/modals/ModalPage";
import { ErrorForm, QuestionForm } from "@/src/app/models/questionModel";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { REGISTER_FORM } from "../../../data/registerFormData";
import { createNewUser } from "../../../services/userService";
import { UserBackend } from "../../../models/userBackendModel";
import ModalMessage from "../../../modals/ModalMessage";
import {
  TypeCondition,
  containsOnlyLetters,
  generalValidator,
  isCorrectPassword,
  isEmail,
  isLenghtString,
  isNumber,
  isWhatsAppNumber,
} from "../../../helpers/validators";
import { ERROR_TYPES } from "../../../data/errorTypesData";

const RegisterPage = () => {
  const { register, handleSubmit, watch } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);

  const [registerQuestions, setRegisterQuestions] = useState<QuestionForm[]>(
    []
  );

  const [errorsList, setErrorsList] = useState<ErrorForm[]>([]);

  const [messageTitle, setMessageTitle] = useState<string>("");

  const [messageText, setMessageText] = useState<string>("");

  const getRegisterQuestions = () => {
    setLoading(true);
    setRegisterQuestions(REGISTER_FORM);
    let newErrorsList: ErrorForm[] = [];
    REGISTER_FORM.map((question) => {
      newErrorsList = newErrorsList.concat(question.errorsQuestions);
    });
    setErrorsList(newErrorsList);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const errorSetter = (message: string) => {
    setLoading(false);
    setMessageTitle("Error");
    setMessageText(message);
    setError(true);
  };

  const names = watch("names");
  const lastNames = watch("lastNames");
  const code = watch("code");
  const email = watch("email");
  const password = watch("password");
  const repeatedPassword = watch("repeatedPassword");
  const phone = watch("phone");

  const submitAction = async (data: FieldValues) => {
    try {
      const {
        names,
        lastNames,
        code,
        email,
        password,
        repeatedPassword,
        phone,
        rol,
      } = data;
      let existError: boolean = false;
      errorsList.map((err) => {
        if (err.active) {
          existError = true;
        }
      });
      if (!existError) {
        const newUser: UserBackend = {
          names: names,
          lastNames: lastNames,
          userCode: code,
          password: password,
          email: email,
          phoneNum: phone,
          roleCode: rol,
        };
        const createdUser: any = await createNewUser(newUser);
        if (!createdUser["error"]) {
          setTimeout(() => {
            setLoading(false);
            setMessageTitle("Usuario creado");
            setMessageText(`El usuario ${createdUser.data.email} fue creado`);
            setSuccess(true);
          }, 500);
        } else {
          errorSetter(
            "Ocurrió un error al registrar al usuario o este ya existe"
          );
        }
      } else {
        errorSetter("Los campos no fueron llenados correctamente!");
      }
    } catch (error) {
      errorSetter(
        "Ocurrió un error al registrar al usuario, vuelva a intentarlo más tarde"
      );
    }
  };

  const actionLink = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    getRegisterQuestions();
  }, []);

  useEffect(() => {
    if (errorsList.length !== 0 && names) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(names, 1),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: containsOnlyLetters(names),
      };

      setErrorsList(
        generalValidator(errorsList, "names", [conditionOne, conditionTwo])
      );
    }
  }, [names]);

  useEffect(() => {
    if (errorsList.length !== 0 && lastNames) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(lastNames, 1),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: containsOnlyLetters(lastNames),
      };

      setErrorsList(
        generalValidator(errorsList, "lastNames", [conditionOne, conditionTwo])
      );
    }
  }, [lastNames]);

  useEffect(() => {
    if (errorsList.length !== 0 && code) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(code, 5, 5),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: isNumber(code),
      };

      setErrorsList(
        generalValidator(errorsList, "code", [conditionOne, conditionTwo])
      );
    }
  }, [code]);

  useEffect(() => {
    if (errorsList.length !== 0 && email) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: isEmail(email),
      };

      setErrorsList(generalValidator(errorsList, "email", [conditionOne]));
    }
  }, [email]);

  useEffect(() => {
    if (errorsList.length !== 0 && password) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(password, 8, 16),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: isCorrectPassword(password),
      };

      setErrorsList(
        generalValidator(errorsList, "password", [conditionOne, conditionTwo])
      );
    }
  }, [password]);

  useEffect(() => {
    if (errorsList.length !== 0 && repeatedPassword) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: repeatedPassword === password,
      };
      setErrorsList(
        generalValidator(errorsList, "repeatedPassword", [conditionOne])
      );
    }
  }, [repeatedPassword]);

  useEffect(() => {
    if (errorsList.length !== 0 && phone) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: isWhatsAppNumber(phone),
      };

      setErrorsList(generalValidator(errorsList, "phone", [conditionOne]));
    }
  }, [phone]);

  return (
    <>
      {(loading || error || success) && (
        <ModalPage>
          {loading && <ModalLoading />}
          {error && (
            <ModalMessage
              action={() => setError(false)}
              title={messageTitle}
              message={messageText}
            />
          )}
          {success && (
            <ModalMessage
              action={() => {
                setSuccess(false);
                actionLink();
              }}
              title={messageTitle}
              message={messageText}
            />
          )}
        </ModalPage>
      )}
      <section className="bg-background-one w-full min-h-screen flex justify-center items-center p-10">
        <PrincipalModelForm
          formTitle={"Registrate"}
          listOfQuestions={registerQuestions}
          buttonText={"Registrar"}
          textLeft={"¿Ya tienes una cuenta?"}
          textLink={"Ingresa aquí"}
          actionLink={actionLink}
          existCheckBox={false}
          existLink={true}
          registerPart={register}
          onHandleSumbit={handleSubmit((data) => submitAction(data))}
          typeButton={"submit"}
          errorList={errorsList}
          actionButton={() => {}}
        />
      </section>
    </>
  );
};

export default RegisterPage;
