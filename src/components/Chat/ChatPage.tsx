import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startChatListening, stopChatListening} from "redux/chatReducer";
import {AppDispatch, AppStateType, useAppDispatch} from "redux/reduxStore";
import {AnyAction} from "redux";
import { ChatMessageAPIType } from "api/chatAPI";
import classnames from "classnames";

import { SendOutlined } from '@ant-design/icons';
import {animated, useTransition} from "react-spring";
import Avatar from "components/Dialogs/DialogItem/Avatar";
import {Link} from "react-router-dom";
import {SendMessageForm} from "components/FormikForms/SendMessageForm";




type PropsType = {
    isActive: boolean
}

const ChatPage: React.FC<PropsType> = React.memo(({isActive}) => {
    return <Chat isActive={isActive}/>
})

const Chat: React.FC<PropsType> = React.memo(({isActive}) => {

    const transition = useTransition(isActive, {
        from:{
            y: 0,
            height: 120,
        },
        enter:{
            y: 0,
            height:'auto',
        },
        leave:{
            y: 0,
            height: 'auto'
        },
        config:{duration: 90}
    })
    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {

            dispatch(startChatListening()).then(() => null)
        return () => {
            dispatch(stopChatListening()).then(() => null)
        }
    },[])

    return <>
        {transition((style, item) => item ? <animated.div style={style} className="chat__block">
            {status === 'error' && <div>Error occurred, refresh page</div>}
            <>
                <div className="chat__block-name">
                    <span>Chat</span>
                </div>
                <Messages />
                <AddChatMessageForm />
            </>
        </animated.div> : '')}
    </>
})
const Messages: React.FC = React.memo(() => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isActiveAutoScroll, setActiveAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isActiveAutoScroll && setActiveAutoScroll(true)
        } else {
            isActiveAutoScroll && setActiveAutoScroll(false)
        }
    }
      useEffect(() => {
          messagesAnchorRef.current?.scrollIntoView()
      }, [messagesAnchorRef.current])
    useEffect(() => {
        if(isActiveAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth", block: 'end'})
        }
    },[messages])

    return <div className="chat__block-messages" onScroll={scrollHandler}>
        {messages.map((m,index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
})
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo(({message}) => {

    return <div className="chat__block-messages-message">
        <div className="chat-avatar">
            <Link to={"/profile/" + message.userId}>
                <Avatar avatarUrl={message.photo} name={message.userName}/>
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
const AddChatMessageForm: React.FC<{}> = ({}) => {

    const dispatch = useAppDispatch()

    const sendMessageHandler = (message:string) => {
        if(!message) return
        dispatch(sendMessage(message))
    }
    return <SendMessageForm sendMessage={sendMessageHandler}/>
}

export default ChatPage