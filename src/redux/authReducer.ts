import {ResultCode, ResultCodeForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {InferActionsTypes, BaseThunkType} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {Action} from "redux";


export type initialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean | false,
    captcha: null as string | null
}

const authReducer = (state = initialState,action:ActionType):initialStateType => {
    switch (action.type) {
        case "SET_USER_AUTH":
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        case "LOGOUT_USER":
            return {
                ...state,
                isAuth: false
            }
        case "SET_CAPTCHA":
            return {
                ...state,
                captcha: action.imageURL
            }
        case "DEL_CAPTCHA":
            return {
                ...state,
                captcha: null
            }
        default:
            return state
    }
}


export const handlingAuthData = ():ThunkType => {
    return async (dispatch) => {
       let response = await authAPI.getAuth()
            if(response.resultCode === ResultCode.Success){
                let {email, id, login} = response.data
                dispatch(actions.setUserAuth(email, id, login))}
    }
}
export const sendAuthDataOnServ = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.submitAuth(email, password, rememberMe, captcha)
            if(response.resultCode === ResultCode.Success){
                dispatch(handlingAuthData())
                dispatch(actions.deleteCaptcha())
            } else {
                if(response.resultCode === ResultCodeForCaptcha.NeedCaptcha) {
                    dispatch(askForCaptcha())
                }
                dispatch(stopSubmit("login", {_error: response.messages[0]}))
            }
    }
}
export const askForCaptcha = ():ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.getCaptcha()
        dispatch(actions.setCaptchaImage(response.url))
    }
}
export const logoutFromServer = ():ThunkType => async (dispatch) => {
            let response = await authAPI.logout()
            if(response.resultCode === ResultCode.Success){
                let response2 = await authAPI.getAuth()
                    if(response2.resultCode === ResultCode.GoWrong){
                        dispatch(actions.logoutUser())
                    }
                }
            }

export const actions = {
    setUserAuth: (email:string,id:number,login:string) => ({type : "SET_USER_AUTH", data : {email,id,login}} as const),
    logoutUser: () => ({type : "LOGOUT_USER"} as const),
    setCaptchaImage: (imageURL:string) => ({type : "SET_CAPTCHA", imageURL} as const),
    deleteCaptcha: () => ({type : "DEL_CAPTCHA"} as const)
}



export default authReducer