const API_URL = "https://chengkev.online/api/v1"

export const api = {

    ////AUTH

      register: API_URL + "/auth/register",
      login: API_URL + "/auth/login",
      logout: API_URL + "/auth/logout",

      forgotPassword: API_URL + "/auth/forgot/password",
      codePassword: API_URL + "/auth/forgot/password-code",
      resetPassword: API_URL + "/auth/reset/password",

      expiredCode: API_URL + "/auth/confirm/email", /////// PENDIENTE

    //// FILES

      upload: API_URL + "/files/upload",

    //// USER

      infoUser: API_URL + "/auth/me",

    //// INFO MEDICAL CENTERS

      infoCompany: API_URL + "/medical-centers",

};