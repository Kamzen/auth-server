import axios from "axios";
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem("token") ? localStorage.getItem("token") : 'null';

const BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
});

// intercept request to check if token expired
axiosInstance?.interceptors.request.use(
  async (req) => {

    const user = jwt_decode(token);

    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;   

    if(!isExpired) {
      console.log('Not expired');
      return req;
    }

    console.log('token expired');

    // const refreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null;

    const resp = await axios({
      url : `${BASE_URL}/auth/refresh`,
      // data : { 'refresh' : refreshToken },
      method : 'POST',
      withCredentials : true
    });

    localStorage.setItem('token', resp?.data?.message.token);

    req.headers.Authorization = `Bearer ${resp?.data?.message.token}`;

    console.log('token refreshed');

    return req;

  },
  async (error) => {
    // if the refresh token is also expired clear localStorage and prompt user to signin again
    console.log(error);
  }
);

export default axiosInstance;
