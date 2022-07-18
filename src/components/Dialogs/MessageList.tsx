import React from 'react';
import Message from "./Message/Message";
import {useSelector} from "react-redux";
import {getAuthID} from "../../redux/auth-selectors";
import {getAuthAvatar} from "../../redux/profile-selectors";
import {getMessageList} from "../../redux/dialog-selectors";
import {DialogType} from "../../typings/types";
import { Empty } from 'antd';

type PropsType = {
    dialogs: DialogType[]
    id: number
}
export const MessageList: React.FC<PropsType> = ({dialogs, id}) => {

    const isMe = useSelector(getAuthID)
    const authAvatar = useSelector(getAuthAvatar)
    const messageList = useSelector(getMessageList)
    const recipientAvatar = dialogs.find(elem => elem.id === id)?.photos.small

    if(messageList.length === 0) {
        return <Empty  className="chat__dialog-messages-empty" description="Нет сообщений"/>
    }
    return (
        <>
            {messageList.map((m) => <Message key={m.id}
                                             message={m.body}
                                             avatar={m.senderId === isMe ? authAvatar : recipientAvatar}
                                             date={m.addedAt}
                                             isMe={m.senderId === isMe}
                                             viewed={m.viewed}
            />)}
        </>
    );
};

