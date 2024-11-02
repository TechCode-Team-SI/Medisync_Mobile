import { api, ApiResult } from "@/src/services/api/apiConfig";
import { getToken } from "@/src/services/auth/sessionServices";
import { handleError } from "@/src/services/error/errorHandler";
import { TPhotoResult, TPhotoUserUpload } from "@/src/types/user";
import axios from "axios";

export const getUser = async (): Promise<ApiResult<any>> => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "Token no disponible." };
    }

    const response = await axios.get(api.infoUser, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserProfile = async (
  data: TPhotoUserUpload
): Promise<ApiResult<TPhotoResult>> => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "Token no disponible." };
    }

    const response = await axios.patch(api.infoUser, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
