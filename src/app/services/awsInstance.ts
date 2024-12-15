"use server"

import axios from "axios";

export const awsApi = axios.create({
  baseURL: process.env.AWS_API_URL,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.AWS_API_KEY,
  },
  validateStatus: (status) => status < 500
});