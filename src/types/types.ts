// Types for API responses
export interface RequestTemplate {
  id: string;
  name: string;
  slug: string;
  fields: Field[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPatient {
  id: string;
  fullName: string;
  dni: string;
  gender: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Field {
  id: string;
  order: number;
  fieldQuestion: FieldQuestion;
}

export interface FieldQuestion {
  id: string;
  name: string;
  label: string;
  slug: string;
  description: null;
  type: FieldQuestionTypeEnum;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
  selectionConfig?: SelectionConfig;
  selections?: Selection[];
}

export interface SelectionConfig {
  id: string;
  isMultiple: boolean;
}

export interface Selection {
  id: string;
  value: string;
}

export interface Agenda {
  id: string;
  name: string;
  weekdays: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Types for system
export type PaginationResponse<T> = {
  data: T[];
  prevPage?: string | null;
  nextPage?: string | null;
  currentPage: number;
  totalPages: number;
};

export interface httpErrorProps {
  error: string;
  message: string;
  status: number;
}

export enum FieldQuestionTypeEnum {
  SELECTION = "selection",
  TEXT = "text",
  NUMBER = "number",
}

export enum SocketEnum {
  JOIN_ROOM = "joinRoom",
  JOIN_USER_ROOM = "joinUserRoom",
  LEAVE_ROOM = "leaveRoom",
  SEND_MESSAGE = "sendMessage",
  TICKET_CHANNEL = "ticketChannel",
}

export interface Image {
  file: { id: string; path: string };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  phone: string;
  image: Image;
}

export type TicketChatMessage = {
  id: string;
  message: string;
  sender: User;
  createdAt: string;
};

export type TicketComment = {
  id: string;
  comment: string;
  createdBy: User;
  createdAt: string;
};

export enum WeekDayEnum {
  LUNES = 1,
  MARTES = 2,
  MIERCOLES = 3,
  JUEVES = 4,
  VIERNES = 5,
  SABADO = 6,
  DOMINGO = 7,
}

export type appErrorProps = Pick<httpErrorProps, "error" | "message">;
