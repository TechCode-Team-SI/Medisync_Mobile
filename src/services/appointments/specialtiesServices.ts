import { api } from "@/src/services/api/apiConfig";
import { PaginationResponse, Specialty } from "@/src/types/types";
import { formatLink } from "@/src/utils/utils";
import { NewApiResult, handleError } from "../error/errorHandler";
import { transporterHTTP } from "../transporter";

export const getspecialites = async (): Promise<NewApiResult<Specialty[]>> => {
  try {
    const link = formatLink(api.specialties, { page: "1", limit: "100" });
    const data = await transporterHTTP.get<PaginationResponse<Specialty>>(link);
    return { success: true, data: data.data };
  } catch (error) {
    return handleError(error);
  }
};
