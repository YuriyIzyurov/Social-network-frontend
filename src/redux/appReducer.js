import {handlingAuthData} from "./authReducer";

const SET_INIT = "SET_INIT"


let initialState = {
    initialized: false
}
const appReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_INIT:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export const setInitializeThunkCreator = () => {
    return (dispatch) => {
        let promise1 = dispatch(handlingAuthData())
        Promise.all([promise1])
            .then(() => {
                dispatch(setInitialize())
            })
    }
}



export const setInitialize = () => ({type : SET_INIT})



export default appReducer