import axios from "axios";
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem("token") ? localStorage.getItem("token") : 'null';

const BASE_URL = "http://localhost:5000";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

AxiosInstance?.interceptors.request.use(
  async (req) => {

    const user = jwt_decode(token);

    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;

    if(!isExpired) return req;

    console.log('token expired');

    const refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null;

    const resp = await axios.get(`${BASE_URL}/auth/refresh/${refreshToken}`);

    localStorage.setItem('token', resp?.data?.message.token);

    req.headers.Authorization = `Bearer ${resp?.data?.message.token}`;

    console.log('token refreshed');

    return req;

  },
  async (error) => {
    // const originalConfig = error.config;

    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   !originalConfig._retry
    // ) {
    //   // make a new request to refresh the token
    //   originalConfig._retry = true;

    //   try {
    //     const refreshToken = localStorage.getItem("refresh");
    //     const resp = await AxiosInstance.post(`/auth/refresh/${refreshToken}`);

    //     const { token } = resp.data;

    //     // update localStorage
    //     localStorage.setItem("token", token);

    //     return AxiosInstance(originalConfig);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  }
);

export default AxiosInstance;
