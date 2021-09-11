import axios from "axios";

const api = axios.create({
  baseURL: "https://api-dmsystem.herokuapp.com/api/v1",
  timeout: 100000,
});

api.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {}
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {}
);

export default api;
