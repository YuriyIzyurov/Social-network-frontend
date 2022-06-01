import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/Textarea";
import {maxLength15, required} from "../../utils/validators/validators";

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
                <Field placeholder={"Login"} component={Input} validate={[required, maxLength15]} name={"login"}/>
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
        </form>
    )
}

let LoginFormRedux = reduxForm({
    form: 'login'
})(LoginForm)

export default Login