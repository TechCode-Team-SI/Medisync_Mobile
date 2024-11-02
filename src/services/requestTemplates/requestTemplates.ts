import { api } from "@/src/services/api/apiConfig";
import { RequestTemplate } from "@/src/types/types";
import { AppError } from "../error/appError";
import { HTTPError } from "../error/httpError";
import { transporterHTTP } from "../transporter";

export const getRequestTemplateBySpecialty = async (
  specialtyId: string
): Promise<RequestTemplate> => {
  try {
    const data = await transporterHTTP.get<RequestTemplate>(
      api.requestTemplateBySpecialty + "/" + specialtyId
    );
    return data;
  } catch (error) {
    console.log("Error al obtener la plantilla de la solicitud:", error);
    if (error instanceof HTTPError) {
      return Promise.reject(
        new AppError({
          error: error.error,
          message: error.message,
        })
      );
    }
    return Promise.reject(
      new AppError({
        error: "internal_error",
        message: "ocurrio un error inesperado",
      })
    );
  }
};
