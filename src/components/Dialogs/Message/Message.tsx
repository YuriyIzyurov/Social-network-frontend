
import React from "react"
import  './Message.scss'
import { format } from 'date-fns'

import classNames from "classnames";
import {CustomTimeDistanceToNow, GetMessageTime} from "../../../utils/Time/CustomTime";
// @ts-ignore
import MessageReadImage from "../../../assets/images/readed.svg"
// @ts-ignore
import MessageNoReadImage from "../../../assets/images/noreaded.svg"


type PropsType = {
    message: string
    avatar: string | undefined
    date: string
    isMe: boolean
    viewed: boolean
}
const Message: React.FC<PropsType> = React.memo(({message, avatar, date, isMe,viewed}) => {

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
                    <GetMessageTime date={date} showFullDate={false}/>
                </span>
            </div>
            {viewed && <img src={MessageReadImage} alt=""/>}
            {!viewed && <img src={MessageNoReadImage} alt=""/>}
        </div>
    </div>
})

export default Message