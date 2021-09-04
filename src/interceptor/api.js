import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 2000,
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
