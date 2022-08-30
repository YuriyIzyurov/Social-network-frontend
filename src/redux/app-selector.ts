import {AppStateType} from "redux/reduxStore";

export const getRedirectLoginStatus = (state:AppStateType) => {
    return state.app.isRedirect
}