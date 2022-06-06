import React from "react"
import s from './Textarea.module.css'

const Element = Element => ({input, meta: {error, submitFailed}, ...props}) => {

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