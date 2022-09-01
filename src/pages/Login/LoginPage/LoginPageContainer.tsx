
import {connect} from "react-redux";
import {ActionType, askForCaptcha, sendAuthDataOnServ} from "redux/authReducer";
import {AppStateType, BaseThunkType} from "redux/reduxStore";
import { compose } from "redux";
import { ComponentType } from "react";
import LoginPage from "pages/Login/LoginPage/LoginPage";
import {handlingBlogUserAuth, ThunkBlogType} from "redux/authBlogReducer";


export type StatePropsLoginType ={
    isAuth: boolean
    captcha: string | null
    error: string | null
    isFetching: boolean
}
export type DispatchPropsLoginType = {
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string) => ThunkType
    askForCaptcha: () => ThunkType
    handlingBlogUserAuth: (email:string, password:string) => ThunkBlogType
}
type ThunkType = BaseThunkType<ActionType>
let mapStateToProps = (state: AppStateType): StatePropsLoginType  => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha,
        error: state.auth.error,
        isFetching: state.auth.isFetching
    }
}

export default compose<ComponentType>(connect<StatePropsLoginType, DispatchPropsLoginType, {}, AppStateType>(mapStateToProps, {sendAuthDataOnServ, askForCaptcha, handlingBlogUserAuth}))(LoginPage)

