import axiosApi from "./axiosApi"

export const postLogin = async (data) =>{
    const _URL = '/api/Login'
    console.log("🚀 ~ file: AuthApi.js:7 ~ postLogin ~ _URL:", _URL)
    console.log("🚀 ~ file: AuthApi.js:8 ~ postLogin ~ data:", data)

    return axiosApi.post(_URL, data)
}

