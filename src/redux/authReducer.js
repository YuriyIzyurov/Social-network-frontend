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
export const setUserAuth = (email,id,login) => ({type : SET_USER_AUTH, data : {email,id,login}})


export default authReducer