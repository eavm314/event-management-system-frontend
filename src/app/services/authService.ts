"use server"

import { cookies } from 'next/headers'

import { backendInstance } from "./backendInstance";

export const login = async (credentials: any) => {
  const { status, data } = await backendInstance.post("/auth/login", credentials);

  let result = false;
  if (status === 200) {
    result = true;
    const { data: { jwt } } = data;
    cookies().set("token", jwt);
  }
  return { result, data };
};

export const logout = async () => {
  console.log("logout");
  cookies().delete("token");
}