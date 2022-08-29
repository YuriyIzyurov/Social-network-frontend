import {instanceSocial, ResponseAPIType, ResultCode, ResultCodeForCaptcha} from "./api";


type GetAuthType = {
    id: number
    email: string
    login: string
}
type GetCaptchaType = {
    url: string
}
type GetLoginType = {
    userID: number
}
export const authAPI = {
    getAuth() {
        return instanceSocial.get<ResponseAPIType<GetAuthType>>(`auth/me`).then(response => response.data)
    },
    submitAuth(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instanceSocial.post<ResponseAPIType<GetLoginType, ResultCode|ResultCodeForCaptcha>>("auth/login", {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instanceSocial.delete<ResponseAPIType>("auth/login").then(response =>  response.data)
    },
    getCaptcha() {
        return instanceSocial.get<GetCaptchaType>("security/get-captcha-url").then(response => response.data)
    }
}