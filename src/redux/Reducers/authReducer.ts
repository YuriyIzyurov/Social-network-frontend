import {ResultCode, ResultCodeForCaptcha} from "api/api";
import {BaseThunkType, InferActionsTypes} from "redux/reduxStore";
import {authAPI} from "api/authAPI";
import {profileAPI} from "api/profileAPI";
import {PhotosType} from "typings";
import {authActions} from "redux/Actions";
import {openNotification} from "utils/notifications/notificationTop";



type initialAuthStateType = typeof initialState
type ActionAuthType = InferActionsTypes<typeof authActions>
export type ThunkAuthType = BaseThunkType<ActionAuthType>

const initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean | false,
    captcha: null as string | null,
    error: null as string | null,
    photos: null as PhotosType | null,
    isFetching: false
}

export const authReducer = (state = initialState,action:ActionAuthType):initialAuthStateType => {
    switch (action.type) {
        case "SET_USER_AUTH":
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        case "LOGOUT_USER":
            return initialState

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
        case "ERROR_MESSAGE":
            return {
                ...state,
                error: action.message
            }
        case "DEL_ERROR":
            return {
                ...state,
                error: null
            }
        case "AUTH_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}


export const handlingAuthData = ():ThunkAuthType => {
    return async (dispatch) => {
        try {
            dispatch(authActions.dataIsFetching(true))
            let response = await authAPI.getAuth()
            if(response.resultCode === ResultCode.Success){
                let response2 = await profileAPI.getProfile(response.data.id)
                dispatch(authActions.dataIsFetching(false))
                let {photos} = response2
                let {email, id, login} = response.data
                dispatch(authActions.setUserAuth(email, id, login, photos))
            } else {
                dispatch(authActions.dataIsFetching(false))
            }
        } catch (e) {
            throw new Error(`Error ---> ${e}`)
        }
    }
}
export const sendAuthDataOnServ = (email:string, password:string, rememberMe:boolean = true, captcha:string, APIKey:string):ThunkAuthType => {
    return async (dispatch) => {
        window.localStorage.setItem('API-KEY', APIKey)
        dispatch(authActions.dataIsFetching(true))
        let response = await authAPI.submitAuth(email, password, rememberMe, captcha)
            if(response.resultCode === ResultCode.Success){
                dispatch(authActions.deleteIncorrectData())
                dispatch(handlingAuthData())
                dispatch(authActions.deleteCaptcha())
            } else {
                if(response.resultCode === ResultCodeForCaptcha.NeedCaptcha) {
                    dispatch(askForCaptcha())
                }
                if(response.resultCode === ResultCode.GoWrong) {
                    openNotification("error","top", null , response.messages[0])
                }
                dispatch(authActions.dataIsFetching(false))
            }
    }
}
export const askForCaptcha = ():ThunkAuthType => {
    return async (dispatch) => {
        let response = await authAPI.getCaptcha()
        dispatch(authActions.setCaptchaImage(response.url))
    }
}
export const logoutFromServer = ():ThunkAuthType => async (dispatch) => {
            let response = await authAPI.logout()
            if(response.resultCode === ResultCode.Success){
                let response2 = await authAPI.getAuth()
                    if(response2.resultCode === ResultCode.GoWrong){
                        dispatch(authActions.logoutUser())
                        window.localStorage.removeItem('API-KEY')
                    }
                }
            }


