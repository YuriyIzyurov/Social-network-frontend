import {ResultCode} from "api/api";
import { CurrentProfileType } from "typings";
import {BaseThunkType, InferActionsTypes} from "redux/reduxStore";
import {profileAPI} from "api/profileAPI";
import {profileActions} from "redux/Actions";

type InitialProfileStateType = typeof initialState
type ActionProfileType = InferActionsTypes<typeof profileActions>
export type ThunkProfileType = BaseThunkType<ActionProfileType>

let initialState = {
    currentProfile: null as CurrentProfileType | null,
    status: "",
    avatarBorderColors: ["#A73EE7","#00EBFF"] as string[],
    redirectToDialog: null as number | null,
    editMode: false
}
export const profileReducer = (state = initialState, action: ActionProfileType):InitialProfileStateType => {
    switch (action.type) {

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
        case "SET_REDIRECT_TO_DIALOG":
            return {
                ...state,
                redirectToDialog: action.id
            }
        case "SET_PROFILE_EDIT_MODE":
            return {
                ...state,
                editMode: action.status
            }
        default:
            return state
    }
}

export const setProfileOnPage = (id:number):ThunkProfileType => {

    return async (dispatch) => {
        const response = await profileAPI.getProfile(id)
            dispatch(profileActions.setCurrentProfile(response))

    }
}
export const getUserStatusInProfile = (id:number):ThunkProfileType =>{
    return  async (dispatch) => {
        const response = await profileAPI.getUserStatus(id)
            dispatch(profileActions.setStatusOnProfile(response))
    }
}
export const updateMyStatus = (status:string):ThunkProfileType =>{
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
            if(response.resultCode === ResultCode.Success) {
                dispatch(profileActions.setStatusOnProfile(status))
            }
    }
}
export const handlePhotoChange = (image:File):ThunkProfileType =>{

    return async (dispatch) => {
        const response = await profileAPI.uploadPhoto(image)
            if(response.resultCode === ResultCode.Success) {

                dispatch(profileActions.setPhotoOnProfile(response.data.photos))
            }
    }
}


export const sendProfileDataOnServ = (newData:CurrentProfileType):ThunkProfileType =>{

    return async (dispatch,getState) => {
        const userId = getState().auth.id
        const response = await profileAPI.updateProfileData(newData)
        if (response.resultCode === ResultCode.Success && userId) {
            dispatch(setProfileOnPage(userId))
        } else {
            debugger
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


