import React from "react"
import s from './../Dialogs.module.css'


const Message = ({message}:any) =>{
    return <div className={s.message}>{message}</div>
}

export default Message