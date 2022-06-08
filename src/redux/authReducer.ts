import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_AUTH = "SETUSERAUTH"
const LOGOUT_USER = "LOGOUT_USER"
const SET_CAPTCHA = "SET_CAPTCHA"
const DEL_CAPTCHA = "DEL_CAPTCHA"

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean | false,
    captcha: null as string | null
}
/*let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha:null
}*/
export type initialStateType = typeof initialState

const authReducer = (state = initialState,action:any):initialStateType => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.imageURL
            }
        case DEL_CAPTCHA:
            return {
                ...state,
                captcha: null
            }
        default:
            return state
    }
}
export const handlingAuthData = () => {
    return async (dispatch:any) => {
       let response = await authAPI.getAuth()
            if(response.resultCode === 0){
                let {email, id, login} = response.data
                dispatch(setUserAuth(email, id, login))}
            return response
    }
}
export const sendAuthDataOnServ = (email:string, password:string, checkbox:boolean, captcha:string) => {
    return async (dispatch:any) => {
        let response = await authAPI.submitAuth(email, password, checkbox, captcha)
            if(response.resultCode === 0){
                dispatch(handlingAuthData())
                dispatch(deleteCaptcha())
            } else {
                if(response.resultCode === 10) {
                    dispatch(askForCaptcha())
                }
                dispatch(stopSubmit("login", {_error: response.messages[0]}))
            }
    }
}
export const askForCaptcha = () => {
    return async (dispatch:any) => {
        let response = await authAPI.getCaptcha()
        dispatch(setCaptchaImage(response.url))
    }
}
export const logoutFromServer = () => {
    return (dispatch:any) => {
            authAPI.logout().then((response) => {
            if(response.resultCode === 0){
                authAPI.getAuth().then((response) => {
                    if(response.resultCode === 1){
                        dispatch(logoutUser())
                    }
                })
            }
         })
    }
}
type AuthDataType = {
    email: string
    id: number
    login: string
}
type SetUserAuthActionType = {
    type: typeof SET_USER_AUTH
    data: AuthDataType
}
type SetCaptchaImage = {
    type: typeof SET_CAPTCHA
    imageURL: string
}
export const setUserAuth = (email:string,id:number,login:string):SetUserAuthActionType => ({type : SET_USER_AUTH, data : {email,id,login}})
export const logoutUser = () => ({type : LOGOUT_USER})
export const setCaptchaImage = (imageURL:string):SetCaptchaImage => ({type : SET_CAPTCHA, imageURL})
export const deleteCaptcha = () => ({type : DEL_CAPTCHA})



export default authReducer