import axios from "axios";
import { api, ApiResult } from "@/src/services/api/apiConfig";
import { handleError } from "@/src/services/error/errorHandler";
import { getToken } from "../auth/sessionServices";
import { TicketComment } from "@/src/types/types";

export const createTicket = async (
  token: string,
  ticketData: {
    title: string;
    description: string;
    type: string;
    ticketTag: { id: string };
  }
): Promise<ApiResult<any>> => {
  try {
    const response = await axios.post(api.tickets, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al crear ticket:", error);
    return handleError(error);
  }
};

export const getTickets = async (page = 1) => {
  const token = await getToken();

  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return {
      success: false,
      message: "No se encontró el token de autenticación.",
    };
  }

  try {
    const response = await axios.get(`${api.mytickets}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log("Error al obtener los tickets:", error);
    return { success: false, message: "Error al obtener los tickets." };
  }
};

export const getTicketTag = async () => {
  const token = await getToken();

  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return {
      success: false,
      message: "No se encontró el token de autenticación.",
    };
  }

  try {
    const response = await axios.get(api.ticketTag, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log("Error al obtener los tipos de Reclamos:", error);
    return {
      success: false,
      message: "Error al obtener los tipos de Reclamos.",
    };
  }
};

///////COMENTARIOS

export const addCommentToTicket = async (
  ticketId: string,
  comment: string
): Promise<ApiResult<any>> => {
  const token = await getToken();

  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return {
      success: false,
      message: "No se encontró el token de autenticación.",
    };
  }

  try {
    const response = await axios.post(
      `${api.tickets}/comments/${ticketId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al agregar comentario al ticket:", error);
    return handleError(error);
  }
};

export const getCommentsForTicket = async (
  ticketId: string
): Promise<ApiResult<any>> => {
  const token = await getToken();

  if (!token) {
    console.log("No se encontró el token de autenticación.");
    return {
      success: false,
      message: "No se encontró el token de autenticación.",
    };
  }

  try {
    const response = await axios.get(`${api.tickets}/comments/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log("Error al obtener los comentarios:", error);
    return handleError(error);
  }
};
