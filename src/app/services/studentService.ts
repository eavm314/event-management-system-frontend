"use server";
import { CourseModel } from "../models/courseModel";
import { EventCardModel } from "../models/eventCardModel";
import { backendInstance } from "./backendInstance";

export const getStudentEvents = async () => {
  const { data } = await backendInstance.get("/students/events");
  return data.data as EventCardModel[];
}

export const getStudentCourses = async () => {
  const { data } = await backendInstance.get("/students/courses");
  return data.data as CourseModel[];
}

export const getAvailableCourses = async () => {
  const { data } = await backendInstance.get("/students/courses/available");
  return data.data as CourseModel[];
}

export const enrollCourses = async (courseCodes: string[]) => {
  const { data } = await backendInstance.post("/students/courses", courseCodes);
  return data.data;
}

export const enrollEvents = async (eventCodes: string[]) => {
  const { data } = await backendInstance.post("/students/events", eventCodes);
  return data.data;
}
