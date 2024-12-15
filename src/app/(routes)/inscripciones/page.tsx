"use client";
import { FormEvent, useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import SelectInput from "../../components/SelectInput";
import ModalLoading from "../../modals/ModalLoading";
import ModalPage from "../../modals/ModalPage";
import { CourseModel, CourseType } from "../../models/courseModel";
import { DataMapModel, GeneralDataModel } from "../../models/generalDataModel";
import { Option } from "../../models/selectOptionModel";
import { getCourseTypes } from "../../services/basicDataService";
import { enrollCourses, getAvailableCourses } from "../../services/studentService";
import ModalMessage from "../../modals/ModalMessage";
import ModalConfirmation from "../../modals/ModalConfirmation";

const EnrollsPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);

  const [types, setTypes] = useState<DataMapModel>({});
  const [courses, setCourses] = useState<CourseModel[]>([]);

  const modelToOption = (model: CourseModel): Option => {
    return {
      value: model.courseCode,
      label: model.courseName,
    }
  }

  const culturals = courses.filter(c => c.type === CourseType.CULTURAL).map(modelToOption);
  const sports = courses.filter(c => c.type === CourseType.SPORT).map(modelToOption);
  const clubs = courses.filter(c => c.type === CourseType.CLUB).map(modelToOption);
  const generals = courses.filter(c => c.type === CourseType.GENERAL).map(modelToOption);


  const getData = async () => {
    const coursesData = await getAvailableCourses();
    setCourses(coursesData);

    const typesData = await getCourseTypes();
    setTypes(typesData);

    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setConfirmationModal(true);
  };

  const successMessage = () => {
    return "Te inscribirás a los siguientes cursos:\n" +
      courses.filter(c => selectedOptions.includes(c.courseCode)).map(c => `- ${c.courseName}`).join('\n')
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}

      {confirmationModal && (
        <ModalPage>
          <ModalConfirmation
            actionOne={async () => {
              setConfirmationModal(false);
              await enrollCourses(selectedOptions);
              setCourses(courses.filter(c => !selectedOptions.includes(c.courseCode)))
              setInfoModal(true);
            }}
            actionTwo={() => setConfirmationModal(false)}
            title={"Confirmar Inscripcion"}
            message={successMessage()}
          />
        </ModalPage>
      )}

      {infoModal && (
        <ModalPage>
          <ModalMessage
            action={() => {
              setInfoModal(false);
              setSelectedOptions([]);
            }}
            title={"Inscripción exitosa"}
            message={"Cursos inscritos correctamente."}
          />
        </ModalPage>
      )}

      <section className="bg-background-one w-full min-h-screen flex justify-center items-center">
        <div className="p-5 rounded-md bg-[#d9d9d9b2] max-w-screen-xl">
          <form
            className="flex flex-col items-center text-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-sans drop-shadow text-black font-medium">
              {"Inscríbete a clubes, talleres y equipos"}
            </h1>

            <div className="flex">
              <div className="p-5 flex flex-col items-center w-1/2">
                <h2 className="text-3xl font-medium">
                  ¿En qué consiste un Taller Cultural?
                </h2>
                <p className="mt-3 mb-5">{types[CourseType.CULTURAL]?.description ?? ""}</p>
                <SelectInput
                  options={culturals}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  emptyMessage="No hay talleres disponibles"
                />
              </div>
              <div className="p-5 flex flex-col items-center w-1/2">
                <h2 className="text-3xl font-medium">
                  ¿En qué consiste un Equipo Deportivo?
                </h2>
                <p className="mt-3 mb-5">{types[CourseType.SPORT]?.description ?? ""}</p>
                <SelectInput
                  options={sports}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  emptyMessage="No hay equipos disponibles"
                />
              </div>
            </div>

            <div className="p-5 w-1/2">
              <h2 className="text-3xl font-medium">¿Qué características tienen los Clubes?</h2>
              <p className="mt-3 mb-5">{types[CourseType.CLUB]?.description ?? ""}</p>
              <div className="w-full flex justify-center">
                <SelectInput
                  options={clubs}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  emptyMessage="No hay clubes disponibles"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <PrimaryButton textButton="Inscribir" typeButton={"submit"} />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EnrollsPage;
