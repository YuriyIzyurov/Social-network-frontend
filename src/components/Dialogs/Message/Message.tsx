import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react"
import s from './../Message/Message.module.css'
import { format } from 'date-fns'
import { enGB, eo, ru } from 'date-fns/locale'
import classNames from "classnames";
const locales = {enGB, eo, ru}

type PropsType = {
    message: string
    avatar: string
    date: number | Date
    userName: string
    isMe: boolean
}
const Message: React.FC<PropsType> = ({message, avatar, date, userName, isMe}) =>{
    return <div className={classNames(s.message, {[s.isMe]: isMe})}>
        <div className={s.messageAvatar}>
            <img src={avatar} alt="User"/>
        </div>
        <div className={s.messageContent}>
            <div className={s.messageBubble}>
                <p className={s.messageText}>{message}</p>
            </div>
            <span className={s.messageDate}>{formatDistanceToNow(date, {addSuffix: true, locale: locales.ru})}</span>
        </div>
        <div>{userName}</div>

    </div>
}

export default Message