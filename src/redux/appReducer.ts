import {handlingAuthData} from './authReducer';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {handlingAuthDataBlog} from "./authBlogReducer";


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    initialized: false,
    isRedirect: false
}
const appReducer = (state = initialState,action:ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_INIT":
            return {
                ...state,
                initialized: true
            }
        case "REDIRECT_TO_LOGIN":
            return {
                ...state,
                isRedirect: action.isRedirect
            }
        default:
            return state
    }
}

export const setInitializeThunkCreator = () => {
    return (dispatch: any) => {
        let promise1 = dispatch(handlingAuthData())
        let promise2 = dispatch(handlingAuthDataBlog())
        Promise.all([promise1, promise2])
            .then(() => {
                dispatch(actions.setInitialize())
            })
    }
}

export const actions = {
    setInitialize: () => ({type : "SET_INIT"} as const),
    setRedirectToLogin: (isRedirect: boolean) => ({type : "REDIRECT_TO_LOGIN", isRedirect} as const)
}

export default appReducer