import axios from "axios";

export type ApiSuccess = { success: true; data: any };

export type ApiError = { success: false; message: string };

export type ApiResult = ApiSuccess | ApiError;

//NEW PROPOSAL
export type NewApiSuccess<T> = { success: true; data: T };

export type NewApiError = { success: false; message: string };

export type NewApiResult<T> = NewApiSuccess<T> | ApiError;

export const handleError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log("Error en la respuesta del servidor:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Error desconocido.",
      };
    }
    console.log("Error de red:", error.message);
    return { success: false, message: "Error de red. Inténtalo de nuevo." };
  }
  console.log("Error inesperado:", error);
  return { success: false, message: "Ocurrió un error inesperado." };
};
