import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {Message} from "pages/Dialogs";
import {useSelector} from "react-redux";
import {getAuthID} from "redux/Selectors/auth-selectors";
import {getAuthAvatar} from "redux/Selectors/profile-selectors";
import {getMessageList} from "redux/Selectors/dialog-selectors";
import {DialogType} from "typings/types";
import {Empty} from 'antd';

type PropsType = {
    dialogs: DialogType[]
    id: number | null
    setMessageSending: Dispatch<SetStateAction<boolean>>
    isMessageSending: boolean
}
export const MessagesList: React.FC<PropsType> = React.memo(({dialogs, id, setMessageSending, isMessageSending}) => {

    const isMe = useSelector(getAuthID)
    const authAvatar = useSelector(getAuthAvatar)
    const messageList = useSelector(getMessageList)
    const messagesRef = useRef<HTMLDivElement>(null)

    const recipientAvatar = dialogs.find(elem => elem.id === id)?.photos.small

    useEffect(() => {
            messagesRef.current?.scrollIntoView(
                {
                    behavior: isMessageSending ? 'smooth' :'auto',
                    block: 'end',
                    inline: 'nearest'
                })
    })

    useEffect(() => {
            setMessageSending(false)
    },[id])

    if(messageList.length === 0) {
        return <Empty  className="chat__dialog-messages-empty" description="Нет сообщений"/>
    }

    return (
        <>
            {messageList.map((m) =>
                <Message
                    key={m.id}
                    messageId={m.id}
                    message={m.body}
                    avatar={m.senderId === isMe ? authAvatar : recipientAvatar}
                    date={m.addedAt}
                    isMe={m.senderId === isMe}
                    viewed={m.senderId !== isMe ? true : m.viewed}
                />)}
            <div ref={messagesRef}></div>
        </>
    );
})

