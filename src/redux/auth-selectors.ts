import {AppStateType} from "./reduxStore";

export const getAuth = (state:AppStateType) => {
    return state.auth.isAuth
}

