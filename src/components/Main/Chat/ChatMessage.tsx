import React from "react";
import {ChatMessageAPIType} from "typings";
import {Link} from "react-router-dom";
import { GradientCharAvatar } from "components/CustomAvatars";


export const ChatMessage: React.FC<{message: ChatMessageAPIType}> = React.memo(({message}) => {

    return <div className="chat__block-messages-message">
        <div className="chat-avatar">
            <Link to={"/profile/" + message.userId}>
                <GradientCharAvatar avatarUrl={message.photo} name={message.userName}/>
            </Link>
        </div>
        <div className="chat-text">
            <span>
                <b>{message.userName}</b>
            </span>
            <p>{message.message}</p>
        </div>
    </div>
})