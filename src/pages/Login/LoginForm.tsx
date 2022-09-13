import {LockOutlined, ReloadOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import React, {useEffect} from 'react';
import {FormikProps, withFormik} from "formik";
import 'pages/Login/Login.scss'
import {actions, ThunkType} from 'redux/Reducers/authReducer';
import {openNotification} from 'utils/notifications/notificationTop';
import {useDispatch} from "react-redux";
import {ThunkBlogType} from "redux/Reducers/authBlogReducer";
import {GlowingEnterButton} from "components/CustomButtons/GlowingEnterButton";
import {getAPIKey} from "utils/validators/getAPIKey";


interface FormValues {
    email: string;
    password: string;
    remember: boolean
    captcha:string
}

interface OtherProps {
    captcha: string | null
    error: string | null
    askForCaptcha: () => ThunkType
    sendAuthDataOnServ: (email:string, password:string, remember:boolean, captcha:string, APIKey:string) => ThunkType
    handlingBlogUserAuth: (email:string, password:string) => ThunkBlogType
    isFetching: boolean
}
const LoginForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props
    let dispatch = useDispatch()

    useEffect(() => {
        if(props.error) {
            openNotification("error","top", props.error)
            dispatch(actions.deleteIncorrectData())
        }
    }, [props.error])

    return (
            <Form onFinish={handleSubmit}>
                <Form.Item
                    validateStatus={!touched.email ? "" : errors.email ? "error" : "success"}
                    hasFeedback
                    help={!touched.email ? "" : errors.email}
                >
                    <Input size="large"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           prefix={<UserOutlined
                               className="site-form-item-icon" />}
                           placeholder="Username"
                           value={values.email}/>
                </Form.Item>

                <Form.Item
                    validateStatus={!touched.password ? "" : errors.password ? "error" : "success"}
                    help={!touched.password ? "" : errors.password}
                >
                    <Input
                        size="large"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        value={values.password}
                    />

                </Form.Item>
                <Form.Item
                    validateStatus={!touched.captcha ? "" : errors.captcha ? "error" : "success"}
                    help={!touched.captcha ? "" : errors.captcha}

                >
                    {props.captcha && <div className="captchaBlock">
                        <Input
                            style={{width: '45%'}}
                            size="large"
                            name="captcha"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="captcha"
                            value={values.captcha}
                        />
                        <Button onClick={props.askForCaptcha} className="captchaBlock__button" shape="circle" icon={<ReloadOutlined />} />
                        <img src={props.captcha}/>
                    </div>}
                </Form.Item>
                {/*<Form.Item valuePropName="checked" noStyle>
                    <Checkbox name="remember">Remember me</Checkbox> //пока по умолчанию запоминать auth
                </Form.Item>*/}
                <Form.Item>
                    <GlowingEnterButton sizeX={100} disabled={props.isFetching}/>
                </Form.Item>
            </Form>
    );
};
export const LoginFormWithFormik = withFormik<OtherProps, FormValues>({

    validate: (values, props) => {
        const errors:{email?: string, password?: string, captcha?: string} = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required'
        }
        if(props.captcha && !values.captcha) {
            errors.captcha = 'Required'
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {

        const APIKey = getAPIKey(values.email)

        props.sendAuthDataOnServ(values.email, values.password, true,values.captcha, APIKey)
        props.handlingBlogUserAuth(values.email, values.password)
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    }
})(LoginForm);
