import {AppStateType} from "redux/reduxStore";

export const getAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const getAuthID = (state:AppStateType) => {
    return state.auth.id
}
export const getMe = (state:AppStateType) => {
    return state.blogAuth.isAuth
}
export const getBloggerID = (state:AppStateType) => {
    return state.blogAuth.id
}

