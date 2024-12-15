export interface CourseModel {
  courseCode: string;
  courseName: string;
  area: string;
  description: string;
  type: CourseType;
  startDate: Date;
  endDate: Date;

  enrollDate?: Date;
  score?: number;
}

export enum CourseType {
  CULTURAL = "TIPO-TC",
  SPORT = "TIPO-ED",
  CLUB = "TIPO-CL",
  GENERAL = "TIPO-TG",
}