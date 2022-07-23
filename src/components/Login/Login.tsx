import React, {useState} from "react";
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import {Input} from "../../common/FormsControl/Textarea";
import {maxLength30, required} from "../../utils/validators/validators";
import {Navigate} from "react-router";
import s from "./../../common/FormsControl/Textarea.module.css"

import {DispatchPropsLoginType, StatePropsLoginType} from "./LoginContainer";
import {BaseThunkType} from "../../redux/reduxStore";
import {ActionType} from "../../redux/authReducer";


export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}
type OwnPropsTypeForm = {
    askForCaptcha: () => ThunkType
    captcha : string | null | undefined
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string) => ThunkType
}
export type ThunkType = BaseThunkType<ActionType>

const Login: React.FC<StatePropsLoginType & DispatchPropsLoginType> = React.memo(({sendAuthDataOnServ, isAuth, askForCaptcha, captcha}) => {
    const onSubmit = (formData: FormDataType) => {
        sendAuthDataOnServ(formData.login, formData.password, formData.rememberMe,formData.captcha)
    }
    if(isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginFormRedux onSubmit={onSubmit} captcha={captcha} sendAuthDataOnServ={sendAuthDataOnServ} askForCaptcha={askForCaptcha}/>
    </div>
})

const LoginForm: React.FC<InjectedFormProps<FormDataType, OwnPropsTypeForm> & OwnPropsTypeForm> = React.memo(({handleSubmit, error, askForCaptcha, captcha}) => {

    const Captcha: React.FC<{captcha: string}> = (captcha) => {

        return <div>
            <div>
                <img src={captcha.captcha}/>
            </div>
            <div>
                <Field placeholder={"Captcha"} component={Input} validate={[required]}
                       name={"captcha"}/>
            </div>
        </div>
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} component={Input} validate={[required, maxLength30]} name={"login"}/>
            </div>
            <div>
                <Field placeholder={"Password"} component={Input} validate={[required]} name={"password"}/>
            </div>
            <div>
                <Field component="input" type={"checkbox"} name={"rememberMe"}/> Remember me
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {error && <div className={s.error}>
                {error}
            </div>}
            {captcha && <Captcha captcha={captcha}/>}
            {captcha && <button onClick={askForCaptcha}>Get new captcha</button>}
        </form>
    )
})

let LoginFormRedux = reduxForm<FormDataType,OwnPropsTypeForm>({
    form: 'login'
})(LoginForm)

export default Login