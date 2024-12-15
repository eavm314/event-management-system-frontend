"use server"

import { GeneralDataModel, toMap } from "../models/generalDataModel";
import { PageInfo } from "../models/pageInfoModel";
import { TeamCardModel } from "../models/teamCardModel";
import { backendInstance } from "./backendInstance";

export const getAllowedPages = async (): Promise<PageInfo[]> => {
  const { data } = await backendInstance.get("/pages");
  return data.data;
};

export const getTeamInfo = async () => {
  const { data } = await backendInstance.get("/team");
  return data.data as TeamCardModel[];
};

export const getCourseTypes = async () => {
  const { data } = await backendInstance.get("/types");
  const types = data.data as GeneralDataModel[];
  return toMap(types);
};