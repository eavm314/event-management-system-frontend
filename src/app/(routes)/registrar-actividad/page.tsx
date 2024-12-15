"use client";

import PrincipalModelForm from "@/src/app/components/PrincipalModelForm";
import ModalLoading from "@/src/app/modals/ModalLoading";
import ModalPage from "@/src/app/modals/ModalPage";
import { ErrorForm, QuestionForm } from "@/src/app/models/questionModel";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ERROR_TYPES } from "../../data/errorTypesData";
import { REGISTER_ACTIVITY_FORM } from "../../data/registerActivityFormData";
import { yearMonthDayToDayMonthYear } from "../../helpers/changeDate";
import {
  TypeCondition,
  containsOnlyLetters,
  dateBetweenInterval,
  dateInFuture,
  generalValidator,
  isLenghtString,
  validateDates,
} from "../../helpers/validators";
import ModalConfirmation from "../../modals/ModalConfirmation";
import ModalMessage from "../../modals/ModalMessage";
import { postNewEvent } from "../../services/eventService";

const RegisterActivity = () => {
  const { register, handleSubmit, watch } = useForm();

  const [registerActivityQuestions, setRegisterActivityQuestions] = useState<
    QuestionForm[]
  >([]);

  const [errorsList, setErrorsList] = useState<ErrorForm[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);

  const [beforeSubmit, setBeforeSubmit] = useState<boolean>(false);

  const [messageTitle, setMessageTitle] = useState<string>("");

  const [messageText, setMessageText] = useState<string>("");

  const [dataForm, setDataForm] = useState<FieldValues>({});

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const errorSetter = (message: string) => {
    setLoading(false);
    setMessageTitle("Error");
    setMessageText(message);
    setError(true);
  };

  const getRegisterActivityQuestionsDB = () => {
    setLoading(true);
    setRegisterActivityQuestions(REGISTER_ACTIVITY_FORM);
    let newErrorsList: ErrorForm[] = [];
    REGISTER_ACTIVITY_FORM.map((question) => {
      newErrorsList = newErrorsList.concat(question.errorsQuestions);
    });
    setErrorsList(newErrorsList);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getRegisterActivityQuestionsDB();
  }, []);

  const nameEvent = watch("nameEvent");
  const descrEvent = watch("descrEvent");
  const initDate = watch("initDate");
  const endDate = watch("endDate");

  const onSumbitData = async (data: FieldValues) => {
    try {
      setLoading(true);
      const { nameEvent, descrEvent, areaEvent, initDate, endDate } = data;
      let existError: boolean = false;
      errorsList.map((err) => {
        if (err.active) {
          existError = true;
        }
      });
      if (!existError) {
        const eventPosted = await postNewEvent({
          name: nameEvent,
          description: descrEvent,
          initDate: yearMonthDayToDayMonthYear(initDate),
          endDate: yearMonthDayToDayMonthYear(endDate),
          area: areaEvent,
          needsEnroll: isChecked,
        });
        if (!eventPosted["error"]) {
          setTimeout(() => {
            setLoading(false);
            setMessageTitle("Evento creado");
            setMessageText(
              `El evento ${eventPosted.data.name} fue creado exitosamente`
            );
            setSuccess(true);
          }, 500);
        } else {
          errorSetter("Ocurrio un error al crear el evento o ya existe");
        }
      } else {
        errorSetter("Los campos no fueron llenados correctamente!");
      }
    } catch (error) {
      errorSetter(
        "Ocurrió un error al crear el evento, vuelva a intentarlo más tarde!"
      );
    }
  };

  useEffect(() => {
    if (errorsList.length !== 0 && nameEvent) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(nameEvent, 1, 255),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.formatError,
        status: containsOnlyLetters(nameEvent),
      };

      setErrorsList(
        generalValidator(errorsList, "nameEvent", [conditionOne, conditionTwo])
      );
    }
  }, [nameEvent]);

  useEffect(() => {
    if (errorsList.length !== 0 && descrEvent) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.lengthError,
        status: isLenghtString(descrEvent, 1, 255),
      };

      setErrorsList(generalValidator(errorsList, "descrEvent", [conditionOne]));
    }
  }, [descrEvent]);

  useEffect(() => {
    if (errorsList.length !== 0 && initDate) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.incorrectDateError,
        status: dateInFuture(initDate),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.timeDateError,
        status: dateBetweenInterval(initDate),
      };

      setErrorsList(
        generalValidator(errorsList, "initDate", [conditionOne, conditionTwo])
      );
    }
  }, [initDate]);

  useEffect(() => {
    if (errorsList.length !== 0 && initDate && endDate) {
      const conditionOne: TypeCondition = {
        type: ERROR_TYPES.incorrectDateError,
        status: dateInFuture(endDate),
      };

      const conditionTwo: TypeCondition = {
        type: ERROR_TYPES.timeDateError,
        status: dateBetweenInterval(endDate),
      };

      const conditionThree: TypeCondition = {
        type: ERROR_TYPES.differenceBetweenDatesError,
        status: validateDates(initDate, endDate),
      };

      setErrorsList(
        generalValidator(errorsList, "endDate", [
          conditionOne,
          conditionTwo,
          conditionThree,
        ])
      );
    }
  }, [endDate, initDate]);

  return (
    <>
      {(loading || error || success || beforeSubmit) && (
        <ModalPage>
          {
            <>
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
                  action={() => setSuccess(false)}
                  title={messageTitle}
                  message={messageText}
                />
              )}
              {beforeSubmit && (
                <ModalConfirmation
                  actionOne={() => {
                    setBeforeSubmit(false);
                    onSumbitData(dataForm);
                  }}
                  actionTwo={() => setBeforeSubmit(false)}
                  title={messageTitle}
                  message={messageText}
                />
              )}
            </>
          }
        </ModalPage>
      )}
      <section className="bg-background-one w-full min-h-screen flex justify-center items-center">
        <PrincipalModelForm
          formTitle={"Registrar actividad"}
          listOfQuestions={registerActivityQuestions}
          checkButtonText={"Pueden inscribirse"}
          buttonText={"Registrar"}
          actionButton={() => {}}
          existCheckBox={true}
          isChecked={isChecked}
          onChangeAction={(event: ChangeEvent<HTMLInputElement>) =>
            setIsChecked(event.target.checked)
          }
          existLink={false}
          registerPart={register}
          onHandleSumbit={handleSubmit((data) => {
            setDataForm(data);
            setMessageTitle("¿Crear evento?");
            setMessageText(
              `Se creará el evento con la siguiente información:
              \n Nombre: ${nameEvent}
              \n Fecha inicio: ${initDate}
              \n Fecha cierre: ${endDate}`
            );
            setBeforeSubmit(true);
          })}
          typeButton={"submit"}
          errorList={errorsList}
        />
      </section>
    </>
  );
};

export default RegisterActivity;
