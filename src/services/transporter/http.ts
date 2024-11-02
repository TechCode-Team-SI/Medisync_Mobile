import axios, { AxiosInstance } from "axios";

import { httpErrorProps } from "@/src/types/types";
import { getToken } from "../auth/sessionServices";
import { HTTPError } from "../error/httpError";
import { Transporter } from "./interface";

export class TransporterHTTP implements Transporter {
  token: string;
  private _client: AxiosInstance;

  constructor() {
    this.token = "";
    this._client = axios.create();
  }

  handleError(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Error en la respuesta del servidor:", error.response.data);
        const err = error.response.data;
        return Promise.reject(
          new HTTPError(err.response?.data as httpErrorProps)
        );
      }
      console.log("Error de red:", error.message);
      return Promise.reject(
        new HTTPError({
          error: "network_error",
          message: "Error de red. Inténtalo de nuevo.",
          status: 500,
        })
      );
    }
    console.log("Error inesperado:", error);
    return Promise.reject(
      new HTTPError({
        error: "default_error",
        message: "Ocurrió un error inesperado.",
        status: 500,
      })
    );
  }

  async getToken() {
    const token = await getToken();
    if (!token) {
      return Promise.reject(
        new HTTPError({
          error: "No token",
          message: "No se encontró el token de autenticación.",
          status: 401,
        })
      );
    }
    return token;
  }

  async get<T>(url: string): Promise<T> {
    try {
      const token = await this.getToken();
      let headers: object = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.get<T>(url, { headers });
      return resp.data;
    } catch (err) {
      return this.handleError(err);
    }
  }
  async post<T>(url: string, body: object): Promise<T> {
    try {
      const token = await this.getToken();
      let headers: object = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.post<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      return this.handleError(err);
    }
  }
  async patch<T>(url: string, body: object): Promise<T> {
    try {
      const token = await this.getToken();
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.patch<T>(url, body, { headers });
      return resp.data;
    } catch (err) {
      return this.handleError(err);
    }
  }
  async delete<T>(url: string): Promise<T> {
    try {
      const token = await this.getToken();
      const headers = { Authorization: `Bearer  ${token}` };
      const resp = await this._client.delete<T>(url, { headers });
      return resp.data;
    } catch (err) {
      return this.handleError(err);
    }
  }
}
