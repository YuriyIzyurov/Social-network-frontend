import {handlingAuthData} from './authReducer';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
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
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const setInitializeThunkCreator = () => {
    return (dispatch:any) => {
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