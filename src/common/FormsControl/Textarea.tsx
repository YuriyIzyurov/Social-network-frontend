import React from "react"
import s from './Textarea.module.css'
import {WrappedFieldProps} from "redux-form/lib/Field";


const Element = (Element:React.FC | string):React.FC<WrappedFieldProps & JSX.Element> => ({input, meta: {error, submitFailed}, ...props}) => {

    return (
        <div className={error && submitFailed && s.error}>
            <div>
                <Element {...input} {...props}/>
            </div>
            <div>
                {error && submitFailed && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = Element("textarea")
export const Input = Element("input")