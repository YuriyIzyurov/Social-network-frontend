import {ResultCode} from "api/api";
import { CurrentProfileType, MessagesDataType, PhotosType } from "typings/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {profileAPI} from "api/profileAPI";

export type InitialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionType>


let initialState = {
    messagesData : [
        {post: "Hi are you?", id: 1,likesCount: 5},
        {post: "Whats is going on?", id: 2,likesCount: 22},
        {post: "Nice 2 meet u", id: 3,likesCount: 14}] as Array<MessagesDataType>,
    textArea : '',
    profileID: null as number | null,
    currentProfile: null as CurrentProfileType | null,
    status: "",
    avatarBorderColors: ["#A73EE7","#00EBFF"] as string[]
}
const profileReducer = (state = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                messagesData : [...state.messagesData, {post: action.newText, id: 4, likesCount: 0}],
                textArea: ''
            }
        case "CHANGE_PROFILE_ID":
            return {
                ...state,
                profileID: action.id
            }
        case "SET_CURRENT_PROFILE":
            return {
                ...state,
                currentProfile: action.profile
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET_PHOTO":
            return {
                ...state,
                currentProfile: {...state.currentProfile, photos: action.photo} as CurrentProfileType
            }
        case "SET_COLORS":
            return {
                ...state,
                avatarBorderColors: action.colors
            }
        default:
            return state
    }
}

export const setProfileOnPage = (id:number):ThunkType => {

    return async (dispatch) => {
        const response = await profileAPI.getProfile(id)
            dispatch(actions.setCurrentProfile(response))

    }
}
export const getUserStatusInProfile = (id:number):ThunkType =>{
    return  async (dispatch) => {
        const response = await profileAPI.getUserStatus(id)
            dispatch(actions.setStatusOnProfile(response))
    }
}
export const updateMyStatus = (status:string):ThunkType =>{
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
            if(response.resultCode === ResultCode.Success) {
                dispatch(actions.setStatusOnProfile(status))
            }
    }
}
export const handlePhotoChange = (image:File):ThunkType =>{

    return async (dispatch) => {
        const response = await profileAPI.uploadPhoto(image)
            if(response.resultCode === ResultCode.Success) {

                dispatch(actions.setPhotoOnProfile(response.data.photos))
            }
    }
}


export const sendProfileDataOnServ = (newData:CurrentProfileType):ThunkType =>{

    return async (dispatch,getState) => {
        const userId = getState().auth.id
        const response = await profileAPI.updateProfileData(newData)
        if (response.resultCode === ResultCode.Success && userId) {
            dispatch(setProfileOnPage(userId))
        } else {
            const error = response.messages[0]
            const errorObj = {
                '_error': error,
                'contacts': {}
            }
            const match = error.match(/Invalid url format \(Contacts->(.+)\)/)
            if (match) {
                const fieldName = match[1].toLowerCase()
                // @ts-ignore
                errorObj.contacts[fieldName] = error
            }
            console.log(errorObj)
            throw error
        }
    }
}
export const actions = {
    addNewPost: (text: string) => ({type : "ADD_POST", newText : text} as const),
    getProfileID: (id: number) => ({type: "CHANGE_PROFILE_ID", id} as const),
    setCurrentProfile: (profile:CurrentProfileType) => ({type: "SET_CURRENT_PROFILE", profile} as const),
    setStatusOnProfile: (status: string) => ({type: "SET_STATUS", status} as const),
    setPhotoOnProfile: (photo: PhotosType) => ({type: "SET_PHOTO", photo} as const),
    setMainColors: (colors: string[]) => ({type: "SET_COLORS", colors} as const),
}


export default profileReducer