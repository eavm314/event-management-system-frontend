"use server"

import axios from "axios";
import { cookies } from "next/headers";

const getJwt = () => {
  const token = cookies().get("token");
  return token?.value ?? "";
}

export const backendInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status < 500
});

backendInstance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + getJwt();
  return config;
});

backendInstance.interceptors.response.use((response) => {
  const { status, data: { message } } = response;
  // console.log(data);
  const timestamp = new Date().toLocaleString();

  if (status < 400){
    console.log(`${timestamp}: ${message}`);
  } else {
    console.error(`${timestamp}: ${message}, error: ${status}`);
  }
  return response;
});
