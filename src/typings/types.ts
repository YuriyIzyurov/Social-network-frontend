import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType} from "../redux/reduxStore";

export type MessagesDataType = {
    post: string
    id: number
    likesCount: number
}
export type ContactsType = {
    github:string
    vk:string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type CurrentProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: keyof ContactsType
    photos: PhotosType
    aboutMe: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    name: string
    id: number
    status: string
    followed: boolean
    photos:PhotosType
}

export type PrivateMessageDataType = {
    message: string
    id: number
}
export type DialogDataType = {
    name: string
    id: number
    src: string
}

