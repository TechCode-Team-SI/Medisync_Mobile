import { api } from "@/src/services/api/apiConfig";
import { PaginationResponse } from "@/src/types/types";
import { formatLink } from "@/src/utils/utils";
import { NewApiResult, handleError } from "../error/errorHandler";
import { transporterHTTP } from "../transporter";

export interface Specialties {
  id: string;
  name: string;
  description: string;
  patch: string;
  isGroup: boolean; 
}

export const getspecialites = async (): Promise<
  NewApiResult<Specialties[]>
> => {
  try {
    const link = formatLink(api.specialties, { page: "1", limit: "100" });
    const data = await transporterHTTP.get<PaginationResponse<Specialties>>(
      link
    );
    return { success: true, data: data.data };
  } catch (error) {
    return handleError(error);
  }
};
