import {handlingAuthData, handlingAuthDataBlog} from 'redux/Reducers';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType, InferActionsTypes} from "redux/reduxStore";
import {appActions} from "redux/Actions";

type InitialAppStateType = typeof initialState
type ActionType = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

const initialState = {
    initialized: false,
    isRedirect: false
}
export const appReducer = (state = initialState,action:ActionType): InitialAppStateType => {
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
                dispatch(appActions.setInitialize())
            })
    }
}


