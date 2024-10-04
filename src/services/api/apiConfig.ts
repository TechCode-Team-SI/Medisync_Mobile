const API_URL = "https://chengkev.online/api/v1"

export const api = {

    ////AUTH

      register: API_URL + "/auth/register",
      login: API_URL + "/auth/login",
      logout: API_URL + "/auth/logout",
      forgot: API_URL + "/auth/forgot/password",

    //// FILES

      upload: API_URL + "/files/upload"

};