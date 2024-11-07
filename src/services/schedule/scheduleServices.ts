import { api } from "@/src/services/api/apiConfig";
import { AppError } from "../error/appError";
import { HTTPError } from "../error/httpError";
import { transporterHTTP } from "../transporter";
import { formatLink } from "@/src/utils/utils";

export const getMedicTimeSlots = async (userId: string): Promise<string[]> => {
  try {
    const link = formatLink(api.medicTimeSlot, { userId });
    const data = await transporterHTTP.get<string[]>(link);
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
