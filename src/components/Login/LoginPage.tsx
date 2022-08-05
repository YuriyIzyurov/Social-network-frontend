import React, {useEffect, useState} from "react";
import "./Login.scss"
import LoginWhiteBlock from "./LoginWhiteBlock/LoginWhiteblock";
import {LoginFormWithFormik} from "./LoginForm";
import {DispatchPropsLoginType, StatePropsLoginType} from "./LoginContainer";
import {Navigate} from "react-router";


const LoginPage: React.FC<StatePropsLoginType & DispatchPropsLoginType> = ({handlingBlogUserAuth, sendAuthDataOnServ, isAuth, askForCaptcha, captcha, error}) => {


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
               <LoginFormWithFormik sendAuthDataOnServ={sendAuthDataOnServ}
                                    handlingBlogUserAuth={handlingBlogUserAuth}
                                    captcha={captcha}
                                    askForCaptcha={askForCaptcha}
                                    error={error}
                                    />
            </LoginWhiteBlock>
        </div>
        </section>
}

export default LoginPage