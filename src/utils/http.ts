/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from "axios";

import {
  clearLS,
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "./auth";
import { config, path } from "../constants/path";
import { HttpStatusCode } from "../constants/httpStatusCode.enum";

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage();
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (this.accessToken) {
          config.headers.authorization = this.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === path.login) {
          // Login --> Store access_token on localStorage
          const data = response.data;
          const access_token = data.data.access_token;
          this.setAccessToken(access_token);
        } else if (url === path.logout) {
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
        } else if (
          error.response?.status !== HttpStatusCode.UnprocessableEntity
        ) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error?.message;
          //   toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  private setAccessToken = (access_token: string) => {
    this.accessToken = access_token;
    setAccessTokenToLocalStorage(access_token);
  };
}

const http = new Http().instance;
export default http;
