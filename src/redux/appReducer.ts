import {handlingAuthData} from './authReducer';
import {ThunkAction} from "redux-thunk/es/types";
import {AppStateType} from "./reduxStore";

const SET_INIT = "SET_INIT"

export type InitialStateType = {
    initialized: boolean
}
let initialState:InitialStateType = {
    initialized: false
}
const appReducer = (state = initialState,action:setInitializeActionType): InitialStateType => {
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
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, setInitializeActionType>

export const setInitializeThunkCreator = () => {
    return (dispatch:any) => {
        let promise1 = dispatch(handlingAuthData())
        Promise.all([promise1])
            .then(() => {
                dispatch(setInitialize())
            })
    }
}

type setInitializeActionType = {
    type: typeof SET_INIT
}
export const setInitialize = ():setInitializeActionType => ({type : SET_INIT})


export default appReducer