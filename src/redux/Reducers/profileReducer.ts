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
    status: '',
    avatarBorderColors: ["#A73EE7","#00EBFF"] as string[],
    redirectToDialog: null as number | null,
    editMode: false,
    contactsError: {
        vk:null as string | null,
        instagram:null as string | null,
        github:null as string | null
    }
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
        case "SET_CONTACTS_ERROR":
            return {
                ...state,
                contactsError: action.errorObj
            }
        case "DELETE_CONTACTS_ERROR":
            return {
                ...state,
                contactsError:{
                    vk:null,
                    instagram:null,
                    github:null
                }
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
            const errorObj = {
                vk:null,
                instagram:null,
                github:null
            }
            for(let i=0; i<response.messages.length; i++) {
                const error = response.messages[i]
                const match = error.match(/Invalid url format \(Contacts->(.+)\)/)
                if (match) {
                    const fieldName = match[1].toLowerCase()
                    // @ts-ignore
                    errorObj[fieldName] = "Некорректный тип ссылки"
                }
            }
            dispatch(profileActions.setContactsError(errorObj))
        }
    }
}


