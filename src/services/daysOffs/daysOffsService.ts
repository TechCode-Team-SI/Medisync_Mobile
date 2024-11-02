import { api } from "@/src/services/api/apiConfig";
import { formatLink } from "@/src/utils/utils";
import { AppError } from "../error/appError";
import { HTTPError } from "../error/httpError";
import { transporterHTTP } from "../transporter";

interface daysOffsInterfaceProps {
  startDate: string;
  endDate: string;
  specialtyId: string;
  userId: string;
}

export const getDaysOffs = async (
  props: daysOffsInterfaceProps
): Promise<string[]> => {
  try {
    const query = {
      startDate: props.startDate,
      endDate: props.endDate,
      specialtyId: props.specialtyId,
      userId: props.userId,
    };
    const link = formatLink(api.daysOffsRanged, {}, query);
    const data = await transporterHTTP.get<string[]>(link);
    return data;
  } catch (error) {
    console.log("Error al obtener los dias libres:", error);
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
