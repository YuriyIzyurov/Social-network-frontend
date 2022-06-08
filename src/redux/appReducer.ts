import {handlingAuthData} from './authReducer';

const SET_INIT = "SET_INIT"

export type InitialStateType = {
    initialized: boolean
}
let initialState:InitialStateType = {
    initialized: false
}
const appReducer = (state = initialState,action:any): InitialStateType => {
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