import {handlingAuthData} from 'redux/Reducers/authReducer';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "redux/reduxStore";
import {handlingAuthDataBlog} from "redux/Reducers/authBlogReducer";



export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

let initialState = {
    initialized: false,
    isRedirect: false
}
const appReducer = (state = initialState,action:ActionType): InitialStateType => {
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

export const setInitializeThunkCreator = ():ThunkType => {
    return async (dispatch) => {
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