import axios from "axios";
import cookie from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API

const config = {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
      
};
 
const axiosApi = axios.create(config);

axiosApi.interceptors.request.use(
  async (config) => {
      let token = await cookie.get("accessToken")
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
  },
  async (error) => {
      console.log('reject',error)

      return Promise.reject(error)
  }
);

axiosApi.interceptors.response.use(
  async (response) => response,
  async (error) => {
      const originalRequest = error.config;
        if(error){
            console.log("🚀 ~ file: axiosApi.js:41 ~ error:", error)   
        }
    
      return Promise.reject(error);
  }
)


export default axiosApi;