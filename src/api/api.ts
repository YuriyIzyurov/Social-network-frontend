import axios from "axios";



const makeConfig = () => {
    const APIKey:string|null = window.localStorage.getItem('API-KEY')
    if(APIKey) {
        return {
            withCredentials: true,
            baseURL: "https://social-network.samuraijs.com/api/1.0/",
            headers: {
                "API-KEY": APIKey
            }
        }
    } else return {
        withCredentials: true,
        baseURL: "https://social-network.samuraijs.com/api/1.0/",
        headers: {
            "API-KEY": "3cb27ece-7074-4bcc-828d-409589c818b6"
        }
    }
}

export const instanceSocial = axios.create(makeConfig())
export const instanceBlog = axios.create({
    baseURL: 'https://blog-social-backend.onrender.com/'
    //baseURL: 'http://localhost:4444/'
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





