import axios from "axios";

export const instanceSocial = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "340cff0d-c6af-4cab-ad3e-1d7e1fbb29f6"
    }
})
//Yourets "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
//Petr_Filyak "API-KEY": "54324abc-85b8-4e66-9338-c1af345ca7dc"
//Egich-Misharing "API-KEY": "340cff0d-c6af-4cab-ad3e-1d7e1fbb29f6"
//LevandowskyR "API-KEY": "6f8432f3-fe36-4304-842c-4117d261f09b"
export const instanceBlog = axios.create({
    baseURL: "http://localhost:4444/"
})
instanceBlog.interceptors.request.use((config) => {
    if(config.headers) {
        config.headers.authorization = window.localStorage.getItem('token') as string
        return config
    }
})

export type ResponseAPIType<D = {}, RC = ResultCode> = {
    data: D
    resultCode: RC
    messages: Array<string> | []
}
export enum ResultCodeForCaptcha  {
    NeedCaptcha = 10
}
export enum ResultCode  {
    Success = 0,
    GoWrong = 1
}





