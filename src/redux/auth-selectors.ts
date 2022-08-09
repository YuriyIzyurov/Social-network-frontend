import {AppStateType} from "./reduxStore";

export const getAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const getAuthID = (state:AppStateType) => {
    return state.auth.id
}
export const getMe = (state:AppStateType) => {
    return [
        state.blogAuth.isAuth,
        state.blogAuth.id
    ]

}

