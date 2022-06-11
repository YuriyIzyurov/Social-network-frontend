import {profileAPI, ResultCode} from "../api/api";
import {stopSubmit} from "redux-form";
import { CurrentProfileType, MessagesDataType, PhotosType } from "../typings/types";
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType} from "./reduxStore";

const ADDPOST = "ADD-POST"
const CHANGE_PROFILE_ID = "CHANGE_PROFILE_ID"
const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_PHOTO = "SET_PHOTO"



let initialState = {
    messagesData : [
            {post: "Hi are you?", id: 1,likesCount: 5},
            {post: "Whats is going on?", id: 2,likesCount: 22},
            {post: "Nice 2 meet u", id: 3,likesCount: 14}] as Array<MessagesDataType>,
        textArea : '',
        profileID: null as number | null,
        currentProfile: null as CurrentProfileType | null,
        status: ""
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionType):InitialStateType => {

    switch (action.type) {
        case ADDPOST:
            return {
                ...state,
                messagesData : [...state.messagesData, {post: action.newText, id: 4, likesCount: 0}],
                textArea: ''
            }
        case CHANGE_PROFILE_ID:
            return {
                ...state,
                profileID: action.id
            }
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PHOTO:
            return {
                ...state,
                currentProfile: {...state.currentProfile, photos: action.photo} as CurrentProfileType
            }
        default:
            return state
    }
}

type ActionType = AddNewPost|GetProfileID|setCurrentProfile|setStatusOnProfile|setPhotoOnProfile

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export const setProfileOnPage = (id:number):ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.getProfile(id)
            dispatch(setCurrentProfile(response))

    }
}
export const getUserStatusInProfile = (id:number):ThunkType =>{
    return  async (dispatch) => {
        const response = await profileAPI.getUserStatus(id)
            dispatch(setStatusOnProfile(response))
    }
}
export const updateMyStatus = (status:string):ThunkType =>{
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
            if(response.resultCode === ResultCode.Success) {
                dispatch(setStatusOnProfile(status))
            }
    }
}
export const handlePhotoChange = (image:File):ThunkType =>{

    return async (dispatch) => {
        const response = await profileAPI.uploadPhoto(image)
            if(response.resultCode === ResultCode.Success) {

                dispatch(setPhotoOnProfile(response.data.photos))
            }
    }
}

export const sendProfileDataOnServ = (newData:CurrentProfileType) =>{
    return async (dispatch:any, getState:any) => {
        const userId = getState().auth.id
        const response = await profileAPI.updateProfileData(newData)
        if (response.resultCode === ResultCode.Success) {
            dispatch(setProfileOnPage(userId))
        } else {
            let error = response.messages[0]
            let errorObj = {'_error': error}
            let match = error.match(/Invalid url format \(Contacts->(.+)\)/)
            if (match) {
                let fieldName = match[1].toLowerCase()
                let errorObj = { 'contacts': {}}
                // @ts-ignore
                errorObj.contacts[fieldName] = error
            }
            dispatch(stopSubmit("ProfileInfo", errorObj))
            throw error
        }
    }
}

type AddNewPost = {
    type: typeof ADDPOST
    newText: string
}
type GetProfileID = {
    type: typeof CHANGE_PROFILE_ID
    id: number
}
type setCurrentProfile = {
    type: typeof SET_CURRENT_PROFILE
    profile: CurrentProfileType
}
type setStatusOnProfile = {
    type: typeof SET_STATUS
    status: string
}
type setPhotoOnProfile = {
    type: typeof SET_PHOTO
    photo: PhotosType
}
export const addNewPost = (text: string):AddNewPost => ({type : ADDPOST, newText : text})
export const getProfileID = (id: number):GetProfileID => ({type: CHANGE_PROFILE_ID, id})
export const setCurrentProfile = (profile:CurrentProfileType):setCurrentProfile => ({type: SET_CURRENT_PROFILE, profile})
export const setStatusOnProfile = (status: string):setStatusOnProfile => ({type: SET_STATUS, status})
export const setPhotoOnProfile = (photo: PhotosType):setPhotoOnProfile => ({type: SET_PHOTO, photo})

export default profileReducer