
import {connect} from "react-redux";
import Login from "./Login";
import {ActionType, askForCaptcha, sendAuthDataOnServ} from "../../redux/authReducer";
import {AppStateType, BaseThunkType} from "../../redux/reduxStore";
import { compose } from "redux";
import { ComponentType } from "react";
import LoginPage from "./LoginPage";


export type StatePropsLoginType ={
    isAuth: boolean
    captcha: string | null
    error: string | null
}
export type DispatchPropsLoginType = {
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string) => ThunkType
    askForCaptcha: () => ThunkType
}
type ThunkType = BaseThunkType<ActionType>
let mapStateToProps = (state: AppStateType): StatePropsLoginType  => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha,
        error: state.auth.error
    }
}

export default compose<ComponentType>(connect<StatePropsLoginType, DispatchPropsLoginType, {}, AppStateType>(mapStateToProps, {sendAuthDataOnServ, askForCaptcha}))(LoginPage)
