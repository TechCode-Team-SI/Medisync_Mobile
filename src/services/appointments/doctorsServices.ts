import { PaginationResponse } from "@/src/types/types";
import { formatLink } from "@/src/utils/utils";
import { api } from "../api/apiConfig";
import { handleError, NewApiResult } from "../error/errorHandler";
import { transporterHTTP } from "../transporter";

export interface Dr {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  dni: string;
}

export const getDr = async (
  specialtyId: string
): Promise<NewApiResult<Dr[]>> => {
  try {
    const link = formatLink(api.usersBySpecialty, { specialtyId });
    const data = await transporterHTTP.get<PaginationResponse<Dr>>(link);
    return { success: true, data: data.data };
  } catch (error) {
    return handleError(error);
  }
};
