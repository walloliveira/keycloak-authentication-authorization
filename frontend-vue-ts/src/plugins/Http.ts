import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { getToken } from "../stores/AuthStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const authInterceptorRequest = (config: AxiosRequestConfig) => {
  const newConfig = config;
  if (newConfig.headers === null || newConfig.headers === undefined) {
    newConfig.headers = new AxiosHeaders();
  }
  newConfig.headers!.set("Authorization", `Bearer ${getToken()}`);
  return newConfig;
};

instance.interceptors.request.use(authInterceptorRequest, undefined);

export default instance;
