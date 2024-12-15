import { GeneralDataModel } from "./generalDataModel";

export interface UserInfoModel {
  userId: string;
  userCode: string;
  fullName: string;
  email: string;
  phoneNum: string;
  role: GeneralDataModel;
  profilePhoto: string;

  career?: string;
  semester?: number;
  studentRole?: GeneralDataModel;

  presentation?: string;
  linkBio?: string;
  activeProfessor?: boolean;
}

export enum Role {
  ADMIN = 'ADM01',
  STUDENT = 'STD01',
  PROFESSOR = 'DOC01',
  COORDINATOR = 'COO01',
}