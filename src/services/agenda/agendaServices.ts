import { api } from "@/src/services/api/apiConfig";
import { AppError } from "../error/appError";
import { HTTPError } from "../error/httpError";
import { transporterHTTP } from "../transporter";
import { formatLink } from "@/src/utils/utils";
import { Agenda } from "@/src/types/types";

export const getMedicAgenda = async (
  id: string,
  type: "user" | "specialty"
): Promise<Agenda> => {
  try {
    const link = formatLink(api.agendaByMedic, { id, type }, { limit: 100 });
    const data = await transporterHTTP.get<Agenda>(link);
    return data;
  } catch (error) {
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
