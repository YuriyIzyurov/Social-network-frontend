import {AppStateType} from "./reduxStore";

export const getCurrentProfile = (state:AppStateType) => {
    return state.profile.currentProfile
}
export const getRedirectDialogStatus = (state:AppStateType) => {
    return state.profile.redirectToDialog
}
export const getMainColors = (state:AppStateType) => {
    return state.profile.avatarBorderColors
}
export const getLoggedUserPhoto = (state:AppStateType) => {
    return state.auth.photos
}

export const getStatus = (state:AppStateType) => {
    return state.profile.status
}

export const getId = (state:AppStateType) => {
    return state.auth.id
}
export const getAuthAvatar = (state:AppStateType) => {
    return state.auth.photos?.small
}
