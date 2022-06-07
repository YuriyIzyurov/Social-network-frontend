import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_AUTH = "SETUSERAUTH"
const LOGOUT_USER = "LOGOUT_USER"
const SET_CAPTCHA = "SET_CAPTCHA"
const DEL_CAPTCHA = "DEL_CAPTCHA"

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null
}
const authReducer = (state = initialState,action) => {
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
    return async (dispatch) => {
       let response = await authAPI.getAuth()
            if(response.resultCode === 0){
                let {email, id, login} = response.data
                dispatch(setUserAuth(email, id, login))}
            return response
    }
}
export const sendAuthDataOnServ = (email, password, checkbox, captcha = null) => {
    return async (dispatch) => {
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
    debugger
    return async (dispatch) => {
        let response = await authAPI.getCaptcha()
        dispatch(setCaptchaImage(response.url))
    }
}
export const logoutFromServer = () => {
    return (dispatch) => {
            authAPI.logout().then(response => {
            if(response.resultCode === 0){
                authAPI.getAuth().then(response => {
                    if(response.resultCode === 1){
                        dispatch(logoutUser())
                    }
                })
            }
         })
    }
}


export const setUserAuth = (email,id,login) => ({type : SET_USER_AUTH, data : {email,id,login}})
export const logoutUser = () => ({type : LOGOUT_USER})
export const setCaptchaImage = (imageURL) => ({type : SET_CAPTCHA, imageURL})
export const deleteCaptcha = () => ({type : DEL_CAPTCHA})



export default authReducer