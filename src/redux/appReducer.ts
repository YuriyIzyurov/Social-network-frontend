import {handlingAuthData} from './authReducer';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    initialized: false
}
const appReducer = (state = initialState,action:ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_INIT":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const setInitializeThunkCreator = () => {
    return (dispatch: any) => {
        let promise1 = dispatch(handlingAuthData())
        Promise.all([promise1])
            .then(() => {
                dispatch(actions.setInitialize())
            })
    }
}

const actions = {
    setInitialize: () => ({type : "SET_INIT"} as const)
}

export default appReducer