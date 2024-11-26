import axios from "axios";
import { api } from "@/src/services/api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewApiResult, handleError } from "@/src/services/error/errorHandler";
import {
  getToken,
  clearSession,
  saveSession,
} from "@/src/services/auth/sessionServices";

export const login = async (
  email: string,
  password: string
): Promise<NewApiResult<any>> => {
  try {
    const response = await axios.post(api.login, { email, password });

    console.log("Inicio de sesión exitoso:", response.data);

    const { token, refreshToken, tokenExpires, user } = response.data;

    await saveSession({
      token,
      refreshToken,
      tokenExpires,
      user,
    });
    // Guardar la contraseña en AsyncStorage
    await AsyncStorage.setItem("userPassword", password);

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async (): Promise<NewApiResult<any>> => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "Token no disponible." };
    }

    const response = await axios.post(
      api.logout,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await clearSession();
    console.log("Cierre de sesión exitoso:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (registerData: any) => {
  try {
    const response = await axios.post(api.register, registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (
  email: string
): Promise<NewApiResult<any>> => {
  try {
    const response = await axios.post(api.forgotPassword, { email });
    console.log("Respuesta de la API al enviar el código:", response.data);

    if (response.data.success) {
      await AsyncStorage.setItem("forgotPasswordEmail", email);

      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message:
          response.data.message || "Ocurrió un error. Inténtalo de nuevo.",
      };
    }
  } catch (error: any) {
    return handleError(error);
  }
};

export const confirmCode = async (code: string): Promise<NewApiResult<any>> => {
  try {
    const email = await AsyncStorage.getItem("forgotPasswordEmail");

    if (!email) {
      return {
        success: false,
        message:
          "No se encontró el correo. Intenta solicitar el código nuevamente.",
      };
    }

    const response = await axios.post(api.codePassword, { email, code });
    console.log("Respuesta de la API:", response.data);

    if (response.data.success) {
      await AsyncStorage.setItem("resetPasswordCode", code);
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message:
          response.data.message || "Código inválido. Inténtalo de nuevo.",
      };
    }
  } catch (error: any) {
    return handleError(error);
  }
};

export const resetPassword = async (
  newPassword: string
): Promise<NewApiResult<any>> => {
  try {
    const email = await AsyncStorage.getItem("forgotPasswordEmail");
    const code = await AsyncStorage.getItem("resetPasswordCode");

    if (!email || !code) {
      return {
        success: false,
        message:
          "No se encontró el correo o el código. Intenta solicitar el código nuevamente.",
      };
    }
    const response = await axios.post(api.resetPassword, {
      password: newPassword,
      email,
      code,
    });
    console.log("Respuesta de la API:", response.data);

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        message:
          response.data.message ||
          "Ocurrió un error al restablecer la contraseña.",
      };
    }
  } catch (error: any) {
    return handleError(error);
  }
};