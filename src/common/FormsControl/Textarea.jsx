import React from "react"
import s from './Textarea.module.css'

const Element = Element => ({input, meta, ...props}) => {
    return (
        <div className={meta.error && meta.submitFailed && s.error}>
            <div>
                <Element {...input} {...props}/>
            </div>
            <div>
                {meta.error && meta.submitFailed && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = Element("textarea")
export const Input = Element("input")