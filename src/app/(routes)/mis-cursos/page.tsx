"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { changeDateToDayMonthYear } from "../../helpers/changeDate";
import ModalLoading from "../../modals/ModalLoading";
import {
  getStudentCourses,
  getStudentEvents,
} from "../../services/studentService";
import MyCourse from "./components/MyCourse";
import MyCoursesLayout from "./components/MyCoursesLayout";
import ModalPage from "../../modals/ModalPage";
import ModalMessage from "../../modals/ModalMessage";
import HeaderMyCourses from "./components/HeaderMyCourses";
import { getUniversityManagement } from "../../helpers/getManagement";
import { calculateState } from "../../helpers/getDateState";
import { CourseModel } from "../../models/courseModel";
import { AREA_LIST_SELECT_OPTIONS } from "../../data/myActivityFilterData";

const MisCursos = () => {
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);

  const [myEventsData, setMyEventsData] = useState<CourseModel[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [activityType, setActivityType] = useState<string>("0");

  const [activityManagement, setActivityManagement] = useState<string>("MAG02");

  const [activityState, setActivityState] = useState<string>("STATUS00");

  const getMyEventsDB = async () => {
    const events = await getStudentCourses();
    setMyEventsData(events);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMyEventsDB();
  }, []);

  const getGeneralFilterCondition = (item: CourseModel): boolean => {
    return (
      getTypeCondition(item) &&
      getManagementCondition(item) &&
      getStateCondition(item)
    );
  };

  const getTypeCondition = (item: CourseModel): boolean => {
    const areaCode = AREA_LIST_SELECT_OPTIONS.find(
      (area) => area.value === item.area
    );
    return areaCode?.id.includes(activityType) || false;
  };

  const getManagementCondition = (item: CourseModel): boolean => {
    if (activityManagement === "MAG01") {
      return (
        getUniversityManagement(
          changeDateToDayMonthYear(item.startDate),
          "DD/MM/YYYY"
        ) === getUniversityManagement(new Date())
      );
    } else {
      return true;
    }
  };

  const getStateCondition = (item: CourseModel): boolean => {
    if (activityState === "STATUS01") {
      return calculateState(item.startDate, item.endDate) === "No iniciado";
    } else if (activityState === "STATUS02") {
      return calculateState(item.startDate, item.endDate) === "En proceso";
    } else if (activityState === "STATUS03") {
      return calculateState(item.startDate, item.endDate) === "Finalizado";
    } else {
      return true;
    }
  };

  return (
    <>
      {error ||
        (loading && (
          <ModalPage>
            <>
              {loading && <ModalLoading />}
              {error && (
                <ModalMessage
                  action={() => {
                    setError(false);
                    router.push("/inscripciones");
                  }}
                  title={"Error 404"}
                  message={"Vuelva a intentarlo más tarde"}
                />
              )}
            </>
          </ModalPage>
        ))}
      <MyCoursesLayout>
        <HeaderMyCourses
          setActivityType={setActivityType}
          setActivityManagement={setActivityManagement}
          setActivityState={setActivityState}
        />
        <div className="w-full h-full flex flex-col items-center">
          {myEventsData
            .filter((item) => getGeneralFilterCondition(item))
            .map((item, index) => (
              <MyCourse
                key={index}
                title={item.courseName}
                image={"/NoImage.jpg"}
                description={item.description || item.courseName}
                area={item.area}
                initDate={changeDateToDayMonthYear(item.startDate)}
                status={calculateState(
                  item.startDate,
                  item.endDate || item.startDate
                )}
                management={getUniversityManagement(item.startDate)}
              />
            ))}
        </div>
      </MyCoursesLayout>
    </>
  );
};

export default MisCursos;
