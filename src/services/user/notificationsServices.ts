import axios from 'axios';
import { getToken } from '../auth/sessionServices'; 
import { api } from '../api/apiConfig';

export const getNotifications = async (page: number) => {
  const token = await getToken(); 
  
  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return { success: false, message: "No se encontró el token de autenticación." };
  }

  try {
    const response = await axios.get(`${api.notifications}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data }; 
  } catch (error: any) {
    console.log("Error al obtener las notificaciones:", error);
    return { success: false, message: "Error al obtener las notificaciones." };
  }
};



export const markAllAsRead = async () => {
  const token = await getToken(); 

  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return { success: false, message: "No se encontró el token de autenticación." };
  }

  try {
    const response = await axios.post(api.notificationsReadAll, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: response.data.success }; 
  } catch (error: any) {
    console.log("Error al marcar todas las notificaciones como leídas:", error);
    return { success: false, message: "Error al marcar todas las notificaciones como leídas." };
  }
};