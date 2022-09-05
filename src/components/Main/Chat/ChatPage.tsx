import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {sendMessage, startChatListening, stopChatListening} from "redux/chatReducer";
import {AppStateType, useAppDispatch} from "redux/reduxStore";
import {animated, useTransition} from "react-spring";
import {ChatMessages} from "components/Main/Chat/ChatMessages";
import {SendMessageForm} from "components/FormikInput/SendMessageForm";
import './ChatPage.scss'

type PropsType = {
    isActive: boolean
}

 const ChatPage: React.FC<PropsType> = React.memo(({isActive}) => {

    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = (message:string) => {
        if(!message) return
        dispatch(sendMessage(message))
    }

    useEffect(() => {

        dispatch(startChatListening()).then(() => null)
        return () => {
            dispatch(stopChatListening()).then(() => null)
        }
    },[])

    const transition = useTransition(isActive, {
        from:{
            y: 620,
            height: 120,
        },
        enter:{
            y: 0,
            height: 738,
        },
        leave:{
            y: 598,
            height: 120,
        },
        config:{duration: 100}

    })

    return <>
        {transition((style, item) => item ? <animated.div style={style} className="chat__block">
            {status === 'error' && <div>Error occurred, refresh page</div>}
            <>
                <div className="chat__block-name">
                    <span>Chat</span>
                </div>
                <ChatMessages />
                <SendMessageForm sendMessage={sendMessageHandler}/>
            </>
        </animated.div> : '')}
    </>
})

export default ChatPage


