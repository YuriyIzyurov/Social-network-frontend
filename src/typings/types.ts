import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType} from "../redux/reduxStore";

//Profile types
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
    small: string | undefined
    large: string | null
}
//User types
export type UserType = {
    name: string
    id: number
    status: string
    followed: boolean
    photos:PhotosType
}
export type DialogType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}
//Dialog types
export type PrivateMessageDataType ={
    message: SelfPrivateMessageType
}
export type SelfPrivateMessageType = {
    addedAt: string
    body: string
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: string | null
    id: string
    isSpam: boolean
    recipientId: number
    recipientName: string
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
export type AllMessageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
export type DialogDataType = {
    name: string
    id: number
    src: string
}
//Posts types
export type PostUserType = {
    "_id": string,
    "fullName": string,
    "email": string,
    "passwordHash": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "avatarUrl": string
}
export type PostType = {
    "_id": string,
    "title": string,
    "text": string,
    "tags": string[],
    "viewsCount": number,
    "commentsCount": number,
    "user": PostUserType,
    "imageUrl": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}
export type AddPostType = {
    title: string
    text: string
    tags: string[] | []
    imageUrl: string | null
}
export type CommentsType = {
    "_id": string,
    "text": string,
    "likesCount": number,
    "user": PostUserType,
    "post": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}



