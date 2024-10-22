////// ARREGLAR: CODIGO REDUNDANTE

import axios from 'axios';
import { api, ApiResult } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler"
import { getToken } from "@/src/services/auth/sessionServices"
import { TPhotoResult, TPhotoUserUpload, TUser } from '@/src/types/user';

export const getUser = async (): Promise<ApiResult<TUser>> => {
  try {
    const token = await getToken(); 

    if (!token) {
      return { success: false, message: 'Token no disponible.' };
    }

    const response = await axios.get(api.infoUser, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserProfile = async (data: TPhotoUserUpload): Promise<ApiResult<TPhotoResult>> => {
  try {
      const token = await getToken();

      if (!token) {
          return { success: false, message: 'Token no disponible.' };
      }

      const response = await axios.patch(api.infoUser, data, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      });

      return { success: true, data: response.data };
  } catch (error) {
      return handleError(error);
  }
};