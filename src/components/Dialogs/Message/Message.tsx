
import React from "react"
import  './Message.scss'
import { format } from 'date-fns'

import classNames from "classnames";
import CustomTime from "../../../utils/Time/CustomTime";
// @ts-ignore
import MessageReadImage from "../../../assets/images/readed.svg"
// @ts-ignore
import MessageNoReadImage from "../../../assets/images/noreaded.svg"


type PropsType = {
    message: string
    avatar: string
    date: Date
    userName: string
    isMe: boolean
    isRead: boolean
}
const Message: React.FC<PropsType> = ({message, avatar, date, userName, isMe,isRead}) => {
    return <div className={classNames("message", {"message--isMe": isMe})}>
        <div className="message__content">
            <div className="message__avatar">
                <img src={avatar} alt="User"/>
            </div>
            <div className="message__info">
                <div className="message__bubble">
                    <p className="message__text">{message}</p>
                </div>
                <span className="message__date">
                    <CustomTime date={date} />
                </span>
            </div>
            {isMe && isRead && <img src={MessageReadImage} alt=""/>}
            {!isRead && <img src={MessageNoReadImage} alt=""/>}
        </div>
    </div>
}

export default Message