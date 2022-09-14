import {connect} from "react-redux";
import {
    askForCaptcha,
    sendAuthDataOnServ,
    handlingBlogUserAuth,
    ThunkBlogType,
    ThunkAuthType
} from "redux/Reducers";
import {AppStateType} from "redux/reduxStore";
import { compose } from "redux";
import { ComponentType } from "react";
import {LoginPage} from "pages/Login";



export type StatePropsLoginType ={
    isAuth: boolean
    captcha: string | null
    error: string | null
    isFetching: boolean
}
export type DispatchPropsLoginType = {
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string, APIKey:string) => ThunkAuthType
    askForCaptcha: () => ThunkAuthType
    handlingBlogUserAuth: (email:string, password:string) => ThunkBlogType
}

let mapStateToProps = (state: AppStateType): StatePropsLoginType  => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha,
        error: state.auth.error,
        isFetching: state.auth.isFetching
    }
}

export default compose<ComponentType>(connect<StatePropsLoginType, DispatchPropsLoginType, {}, AppStateType>(mapStateToProps, {sendAuthDataOnServ, askForCaptcha, handlingBlogUserAuth}))(LoginPage)

