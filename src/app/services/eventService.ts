"use server";

import { EventCardModel } from "../models/eventCardModel";
import { backendInstance } from "./backendInstance";

export const getEvents = async () => {
  const { data } = await backendInstance.get("/events");
  return data.data as EventCardModel[];
};

export const getEventByCode = async (code: string) => {
  const options = await backendInstance.get("/events", { params: { code } });
  return options.data[0];
};

export const postNewEvent = async (newEvent: BackendEventInterface) => {
  console.log(newEvent);
  const { data } = await backendInstance.post("/events", newEvent);
  return data;
}
