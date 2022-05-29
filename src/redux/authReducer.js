import {authAPI} from "../api/api";

const SET_USER_AUTH = "SETUSERAUTH"

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
export const setUserAuth = (email,id,login) => ({type : SET_USER_AUTH, data : {email,id,login}})


export default authReducer