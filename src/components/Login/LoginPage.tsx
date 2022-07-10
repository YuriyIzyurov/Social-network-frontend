import React from "react";
import  "./Login.scss"
import classNames from "classnames";
import LoginWhiteBlock from "./LoginWhiteBlock/LoginWhiteblock";
import { Button } from "./Button/Button";
import {LoginFormWithFormik} from "./LoginForm";
import {BaseThunkType} from "../../redux/reduxStore";
import {ActionType} from "../../redux/authReducer";
import {DispatchPropsLoginType, StatePropsLoginType} from "./LoginContainer";
import {Navigate} from "react-router";

export type ThunkType = BaseThunkType<ActionType>
export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}
type OwnPropsTypeForm = {
    askForCaptcha: () => ThunkType
    captcha : string | null | undefined
    sendAuthDataOnServ: (email:string, password:string, remember:boolean, captcha:string) => ThunkType
}

const LoginPage: React.FC<StatePropsLoginType & DispatchPropsLoginType> = ({sendAuthDataOnServ, isAuth, askForCaptcha, captcha}) => {

    if(isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return <section className="auth">
        <div className="auth__content">
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <LoginWhiteBlock>
               <LoginFormWithFormik sendAuthDataOnServ={sendAuthDataOnServ} captcha={captcha} askForCaptcha={askForCaptcha} />
            </LoginWhiteBlock>
        </div>
        </section>
}

export default LoginPage