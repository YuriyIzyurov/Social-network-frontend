import React, {useEffect, useState} from "react";
import "pages/Login/LoginPage/Login.scss"
import  "pages/Login/LoginPage/LoginWhiteBlock.scss"
import {LoginFormWithFormik} from "pages/Login/LoginForm/LoginForm";
import {DispatchPropsLoginType, StatePropsLoginType} from "pages/Login/LoginPage/LoginPageContainer";
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
            <div className="white-block">
               <LoginFormWithFormik sendAuthDataOnServ={sendAuthDataOnServ}
                                    handlingBlogUserAuth={handlingBlogUserAuth}
                                    captcha={captcha}
                                    askForCaptcha={askForCaptcha}
                                    error={error}
                                    />
            </div>
        </div>
        </section>
}

export default LoginPage