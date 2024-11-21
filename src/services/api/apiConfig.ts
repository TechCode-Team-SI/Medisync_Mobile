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

  usersBySpecialty: API_URL + "/users/specialties/:specialtyId",

  //// FAMILY GROUP

  userPatient: API_URL + "/users/patient/me",

  //// ARTICLES
  articles: API_URL + "/articles",
  articlesCategories: API_URL + "/article-categories",

  //// REQUEST TEMPLATE

  requestTemplateBySpecialty: API_URL + "/request-templates/specialty",

  //// REQUEST

  createRequest: API_URL + "/requests",
  getRequest: API_URL + "/requests/made-by-me",

  rateRequest: API_URL + "/requests/rate/:id",           ///CALIFICAR CITAS
  cancelRequest: API_URL + "/requests/cancel/:id",           ///CANCELAR CITAS


  //// SUPPORT
  tickets: API_URL + "/tickets",
  mytickets: API_URL + "/tickets/me",

  ticketTag: API_URL + "/ticket-types",


  //// AGENDA

  agendaByMedic: API_URL + "/agendas/:type/:id",
  medicTimeSlot: API_URL + "/agendas/slot/:type/:id",

  //// DAYS OFFS

  daysOffsRanged: API_URL + "/days-offs/ranged",

  //// INFO MEDICAL CENTERS

  infoCompany: API_URL + "/medical-centers",

  //// SPECIALTIES
  specialties: API_URL + "/specialties/active",
};
