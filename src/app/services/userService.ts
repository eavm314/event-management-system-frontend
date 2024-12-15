"use server";

import path from "path";
import { UserBackend } from "../models/userBackendModel";
import { UserInfoModel } from "../models/userInfoModel";
import { awsApi } from "./awsInstance";
import { backendInstance } from "./backendInstance";
import { getImageUrl } from "../helpers/getImageUrl";

export const createNewUser = async (params: UserBackend) => {
  const promise = await backendInstance.post('/users', params);
  const { data } = promise;
  return data;
}

export const getUserInfo = async () => {
  const { data } = await backendInstance.get('/users/me');
  return data.data as UserInfoModel;
}

export const uploadProfilePhoto = async (formData: FormData) => {
  const { status } = await backendInstance.post('/users/upload', formData,
    { headers: { 'Content-Type': 'multipart/form-data' } });

  return status == 201;
}

export const downloadProfilePhoto = async (fileName: string) => {
  const { data } = await backendInstance.get(`/users/download/${fileName}`);
  return data.data as string;
}

export const uploadPhotoS3 = async (formData: FormData) => {
  const image = formData.get('profilePhoto') as File;
  const userCode = formData.get('userCode') as string;
  const extension = path.parse(image.name).ext;

  const fileName = `${userCode}${extension}`;

  const buffer = await image.arrayBuffer();
  const { status } = await awsApi.put(`/profile/${fileName}`, buffer,
    { headers: { 'Content-Type': image.type } });

  if (status === 200) {
    const { status } = await backendInstance.put('/users/me', { profilePhoto: fileName });
    return status == 200;
  }

  return false;
}

export const downloadPhotoS3 = async (fileName: string) => {
  const { data } = await awsApi.get(`/profile/${fileName}`);
  return data;
}