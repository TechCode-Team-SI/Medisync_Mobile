const API_URL = "https://chengkev.online/api/v1";

export type ApiResult<T> = { success: boolean; data?: T; message?: string };

export const api = {
  ////AUTH

  register: API_URL + "/auth/register",
  login: API_URL + "/auth/login",
  logout: API_URL + "/auth/logout",

  forgotPassword: API_URL + "/auth/forgot/password",
  codePassword: API_URL + "/auth/forgot/password-code",
  resetPassword: API_URL + "/auth/reset/password",

  expiredCode: API_URL + "/auth/confirm/email", // PENDIENTE

  //// FILES

  upload: API_URL + "/files/upload",

  //// USER

  infoUser: API_URL + "/auth/me",

  //// FAMILY GROUP

  userPatient: API_URL + "/users/patient/me",

  //// REQUEST TEMPLATE

  requestTemplateBySpecialty: API_URL + "/request-templates/specialty",

  //// REQUEST

  createRequest: API_URL + "/requests",

  //// SUPPORT
  tickets: API_URL + "/tickets",
  mytickets: API_URL + "/tickets/me",

  //// SCHEDULE

  scheduleByUser: API_URL + "/schedules/user",

  //// AGENDA

  agendaByMedic: API_URL + "/agendas/user/:userId",

  //// DAYS OFFS

  daysOffsRanged: API_URL + "/days-offs/ranged",

  //// INFO MEDICAL CENTERS

  infoCompany: API_URL + "/medical-centers",

  //// SEARCH
  specialites: API_URL + "/specialties",
};
