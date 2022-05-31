import React from "react";
import {Field, reduxForm} from "redux-form";

const Login = (props) => {
    const onSubmit = (formData) => {

        props.sendAuthDataOnServ(formData.login, formData.password, formData.rememberMe)
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
                <Field placeholder={"Login"} component="input" name={"login"}/>
            </div>
            <div>
                <Field placeholder={"Password"} component="input" name={"password"}/>
            </div>
            <div>
                <Field component="input" type={"checkbox"} name={"rememberMe"}/> Remember me
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

let LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm)

export default Login