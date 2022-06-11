import axios, {AxiosPromise, AxiosResponse} from "axios";
import {CurrentProfileType, PhotosType, UserType} from "../typings/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
    }
})

export enum ResultCodeForCaptcha  {
    NeedCaptcha = 10
}
export enum ResultCode  {
    Success = 0,
    GoWrong = 1
}
type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type GetAuthType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCode
    messages: Array<string>
}
type ResponseType = {
    resultCode: ResultCode | ResultCodeForCaptcha
    messages: Array<string> | []
    data: any
}
type GetCaptchaType = {
    url: string
}
type UploadPhotoType = {
    data: {photos: PhotosType}
    resultCode: number
    messages: Array<string>
}


export const usersAPI =  {
    getUsers (activePage:number, usersOnPage:number) {
        return instance.get<GetUsersType>(`users?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    followUser(id:number) {
        return instance.post<ResponseType>(`follow/${id}`,{}).then(response => response.data)
    },
    unFollowUser(id:number) {
        return instance.delete<ResponseType>(`follow/${id}`).then(response => response.data)
    }
}


export const profileAPI = {
    getProfile(idFromURL:number){
        return instance.get<CurrentProfileType>(`profile/${idFromURL}`).then(response => response.data)
    },
    getUserStatus(id:number){
        return instance.get<string>(`profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status:string){
        return instance.put<ResponseType>('profile/status',{status:status}).then(response => response.data)
    },
    uploadPhoto(file:File){
        const formData = new FormData()
        formData.append("image", file)
        return instance.put<UploadPhotoType>('profile/photo',formData).then(response => response.data)
    },
    updateProfileData(newData:any){
        return instance.put<ResponseType>('profile',newData).then(response => response.data)
    }
}


export const authAPI =  {
    getAuth () {
        return instance.get<GetAuthType>(`auth/me`).then(response => response.data)
    },
    submitAuth (email:string, password:string, rememberMe:boolean, captcha:string) {
        return instance.post<ResponseType>("auth/login",{email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout () {
        return instance.delete<ResponseType>("auth/login").then(response => response.data)
    },
    getCaptcha() {
        return instance.get<GetCaptchaType>("security/get-captcha-url").then(response => response.data)
    }

}
