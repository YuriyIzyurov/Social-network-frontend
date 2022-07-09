import React from "react";
import  "./Login.scss"
import classNames from "classnames";
import LoginWhiteBlock from "./LoginWhiteBlock/LoginWhiteblock";
import { Button } from "./Button/Button";
import LoginForm from "./LoginForm";


const LoginPage = () => {
    return <section className="auth">
        <div className="auth__content">
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <LoginWhiteBlock>
                <LoginForm/>
                {/*<Button type="primary" size="large">Зарегистрироваться</Button>*/}
            </LoginWhiteBlock>
        </div>
        </section>
}

export default LoginPage