import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 100000,
});

api.interceptors.request.use(
  (request) => {
    request.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return request;
  },
  (error) => {
    console.log(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .patch(
          "https://api-dmsystem.herokuapp.com/api/v1/users/verifyRefreshToken", {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            localStorage.setToken("token", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("token");

            return axios(originalRequest);
          }
        });
    }
  }
);

export default api;