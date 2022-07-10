import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import React from 'react';
import {withFormik, FormikProps, Formik} from "formik";
import { Button as CustomButton} from "./Button/Button";
import {Checkbox } from 'formik-antd'
import { ThunkType } from './LoginPage';
import store, {useAppDispatch} from "../../redux/reduxStore";
import {sendAuthDataOnServ} from "../../redux/authReducer";

interface FormValues {
    email: string;
    password: string;
    remember: boolean
    captcha:string
}

interface OtherProps {
    captcha: string | null
    askForCaptcha: () => ThunkType
    sendAuthDataOnServ: (email:string, password:string, remember:boolean, captcha:string) => ThunkType
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
                    <Input
                        style={{ width: '30%' }}
                        size="large"
                        name="captcha"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="captcha"
                        value={values.captcha}
                    />
                </Form.Item>
                <Form.Item valuePropName="checked" noStyle>
                    <Checkbox name="remember">Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" disabled={isSubmitting} type="primary" size="large">Войти в аккаунт</Button>
                </Form.Item>
            </Form>
    );
};
export const LoginFormWithFormik = withFormik<OtherProps, FormValues>({

    validate: values => {
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
        if(!values.captcha) {
            errors.captcha = 'Required'
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
       props.sendAuthDataOnServ(values.email, values.password, values.remember,values.captcha)
    },
    displayName: 'RegisterForm',
})(LoginForm);
