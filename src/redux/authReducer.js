import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_AUTH = "SETUSERAUTH"
const LOGOUT_USER = "LOGOUT_USER"

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false
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
            return{
                ...state,
                isAuth: false
            }

        default:
            return state
    }
}
export const handlingAuthData = () => {
    return (dispatch) => {
        authAPI.getAuth().then(data => {
            if(data.resultCode === 0){
                let {email, id, login} = data.data
                dispatch(setUserAuth(email, id, login))}
        })
    }
}

export const sendAuthDataOnServ = (email, password, checkbox) => {
    return (dispatch) => {
        authAPI.submitAuth(email, password, checkbox).then(data => {
            if(data.resultCode === 0){
                dispatch(handlingAuthData())
            } else {
                dispatch(stopSubmit("login", {_error: data.messages[0]}))
            }
        })
    }
}
export const logoutFromServer = () => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if(data.resultCode === 0){
                authAPI.getAuth().then(data => {
                    if(data.resultCode === 1){
                        dispatch(logoutUser())
                    }
                })

            }
        })
    }
}


export const setUserAuth = (email,id,login) => ({type : SET_USER_AUTH, data : {email,id,login}})
export const logoutUser = () => ({type : LOGOUT_USER})


export default authReducer