import React from "react"
import s from './Textarea.module.css'

export const Textarea = ({input, meta, ...props}) => {
    return (
        <div className={meta.error && meta.submitFailed && s.error}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            <div>
                {meta.error && meta.submitFailed && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    return (
        <div className={meta.error && meta.submitFailed && s.error}>
            <div>
                <input {...input} {...props}/>
            </div>
            <div>
                {meta.error && meta.submitFailed && <span>{meta.error}</span>}
            </div>
        </div>
    )
}