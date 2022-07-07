
import React from "react"
import s from './../Message/Message.module.css'


type PropsType = {
    message: string
    avatar: string
    date: string
    userName: string
}
const Message: React.FC<PropsType> = ({message, avatar, date, userName}) =>{
    return <div className={s.message}>
        <div className={s.messageAvatar}>
            <img src={avatar} alt="User"/>
        </div>
        <div className={s.messageContent}>
            <div className={s.messageBubble}>
                <p className={s.messageText}>{message}</p>
            </div>
            <span className={s.messageDate}>{date}</span>
        </div>
        <div>{userName}</div>

    </div>
}

export default Message