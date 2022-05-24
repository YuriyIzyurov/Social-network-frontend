const SET_USER_AUTH = "SETUSERAUTH"

let initialState = {
    userID: null,
    mail: null,
    login: null
}
const authReducer = (state = initialState,action) => {


    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data
            }

        default:
            return state
    }
}
export const setUserAuth = (userID,mail,login) => ({type : SET_USER_AUTH, data : {userID,mail,login}})


export default authReducer