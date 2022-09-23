import React, {useEffect, useState} from "react";
import "pages/Login/Login.scss"
import {LoginFormWithFormik} from "pages/Login";
import {DispatchPropsLoginType, StatePropsLoginType} from "pages/Login/LoginPageContainer";
import {Navigate} from "react-router";
import {useAppDispatch} from "redux/reduxStore";
import {appActions, authActions} from "redux/Actions";
import {useSelector} from "react-redux";
import {getError} from "redux/Selectors";



export const LoginPage: React.FC<StatePropsLoginType & DispatchPropsLoginType> = ({handlingBlogUserAuth, sendAuthDataOnServ, isAuth, askForCaptcha, captcha, error, isFetching}) => {

    const dispatch = useAppDispatch()
    const socialError = useSelector(getError)

    useEffect(() => {
        dispatch(appActions.setRedirectToLogin(true))
        return () => {
            dispatch(appActions.setRedirectToLogin(false))
        }
    }, [])

    if(isAuth) {
        return <Navigate to={"/profile"}/>
    }
    if(socialError) {
        dispatch(authActions.deleteIncorrectData())
        window.location.reload()
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
                                    isFetching={isFetching}
                                    />
            </div>
        </div>
        </section>
}
