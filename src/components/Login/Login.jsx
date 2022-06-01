import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/Textarea";
import {maxLength30, required} from "../../utils/validators/validators";
import {Navigate} from "react-router";
import s from "./../../common/FormsControl/Textarea.module.css"

const Login = (props) => {
    const onSubmit = (formData) => {
        props.sendAuthDataOnServ(formData.login, formData.password, formData.rememberMe)
    }
    if(props.isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginFormRedux onSubmit={onSubmit}  sendAuthDataOnServ={props.sendAuthDataOnServ}/>
    </div>
}

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
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
            {props.error && <div className={s.error}>
                {props.error}
            </div>}
        </form>
    )
}

let LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm)

export default Login