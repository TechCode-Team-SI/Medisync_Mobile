import axios from "axios";
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewApiResult, handleError } from "@/src/services/error/errorHandler";

export const confirmEmail = async (
    email: string
  ): Promise<NewApiResult<any>> => {
    try {
      const token = await AsyncStorage.getItem("authToken"); 
  
      if (!token) {
        console.error("Token de autenticación no encontrado.");
        return {
          success: false,
          message: "No estás autenticado.",
        };
      }
  
      const response = await axios.post(
        api.confirmEmail,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Respuesta de la API:", response.data);
  
      if (response.data.success) {
        await AsyncStorage.setItem("confirmEmail", email);
  
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          message:
            response.data.message || "Ocurrió un error. Inténtalo de nuevo.",
        };
      }
    } catch (error: any) {
      console.error("Error al confirmar el correo:", error.response?.data || error);
      return handleError(error);
    }
  };
  
  
  
  export const confirmCodeEmail = async (code: string): Promise<NewApiResult<any>> => {
    try {
      const email = await AsyncStorage.getItem("confirmEmail");
      const token = await AsyncStorage.getItem("authToken");
  
      if (!email) {
        return {
          success: false,
          message: "No se encontró el correo. Intenta solicitar el código nuevamente.",
        };
      }
      if (!token) {
        return {
          success: false,
          message: "Token no encontrado.",
        };
      }
      const response = await axios.post(
        api.confirmCode,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta de la API al confirmar el código:", response.data);
      if (response.data.success) {
        await AsyncStorage.setItem("confirmCode", code);
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          message: response.data.message || "Código inválido. Inténtalo de nuevo.",
        };
      }
    } catch (error: any) {
      console.error("Error al confirmar el código:", error.response?.data || error);
      return handleError(error);
    }
  };
  