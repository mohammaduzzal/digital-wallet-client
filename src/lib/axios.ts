import { config } from '@/config';
import axios, { type AxiosRequestConfig } from 'axios';
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true
})


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log("axios", config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
},

);


let isRefreshing = false;

let pendingQueue : {
  resolve: (value : unknown) => void;
  reject : (value : unknown) => void;
}[] = [];

const processQue = (error : unknown) =>{
  pendingQueue.forEach((promise) =>{
    if(error){
      promise.reject(error)
    }else{
      promise.resolve(null)
    }
  })
  pendingQueue = []
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async(error) => {

    //  console.log("req failed", error.response.data.message)

    const originalRequest = error.config as AxiosRequestConfig & {_retry : boolean};
    // console.log(originalRequest)

      if(error.response.status === 500 && error.response.data.message === 'jwt expired' && !originalRequest._retry){
        // console.log("your token is expired")


        originalRequest._retry = true

        if(isRefreshing){
          return new Promise((resolve,reject) =>{
            pendingQueue.push({resolve,reject})
          })
          .then(()=> axiosInstance(originalRequest))
          .catch((error)=>Promise.reject(error))
        }


        isRefreshing = true
      

      try {

       const res = await axiosInstance.post("/auth/refresh-token")
       console.log("new token has arrived",res)

       processQue(null)
       return axiosInstance(originalRequest)

      } catch (error) {
        processQue(error)
       return Promise.reject(error)
      }finally{
        isRefreshing =false
      } 
    }


      // for every reject
      return Promise.reject(error)
    }
);
