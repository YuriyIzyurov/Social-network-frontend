import {AppStateType} from "redux/reduxStore";

export const getAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const getAuthID = (state:AppStateType) => {
    return state.auth.id
}
export const getError = (state:AppStateType) => {
    return state.auth.error
}
export const getMe = (state:AppStateType) => {
    return state.blogAuth.isAuth
}
export const getBloggerID = (state:AppStateType) => {
    return state.blogAuth.id
}
export const getBloggerAvatar = (state:AppStateType) => {
    return state.blogAuth.avatarUrl.small
}

