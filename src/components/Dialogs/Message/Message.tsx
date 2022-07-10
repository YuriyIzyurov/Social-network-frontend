import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react"
import  './Message.scss'
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
const Message: React.FC<PropsType> = ({message, avatar, date, userName, isMe}) => {
    return <div className={classNames("message", {"message--isMe": isMe})}>
        <div className="message__content">
            <div className="message__avatar">
                <img src={avatar} alt="User"/>
            </div>
            <div className="message__info">
                <div className="message__bubble">
                    <p className="message__text">{message}</p>
                </div>
                <span className="message__date">{formatDistanceToNow(date, {
                    addSuffix: true,
                    locale: locales.ru
                })}</span>
            </div>
        </div>
    </div>
}

export default Message