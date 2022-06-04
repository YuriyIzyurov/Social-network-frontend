import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/Textarea";
import {maxLength30, required} from "../../utils/validators/validators";
import {Navigate} from "react-router";
import s from "./../../common/FormsControl/Textarea.module.css"

const Login = ({sendAuthDataOnServ, isAuth}) => {
    const onSubmit = (formData) => {
        sendAuthDataOnServ(formData.login, formData.password, formData.rememberMe)
    }
    if(isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginFormRedux onSubmit={onSubmit}  sendAuthDataOnServ={sendAuthDataOnServ}/>
    </div>
}

const LoginForm = ({handleSubmit, error }) => {
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
        </form>
    )
}

let LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm)

export default Login