import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startChatListening, stopChatListening} from "../../redux/chatReducer";
import {AppDispatch, AppStateType, useAppDispatch} from "../../redux/reduxStore";
import {AnyAction} from "redux";
import { ChatMessageAPIType } from "../../api/chatAPI";





const ChatPage: React.FC = React.memo(() => {
    return <Chat />
})

const Chat: React.FC = React.memo(() => {

    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
            dispatch(startChatListening()).then(() => null)
        return () => {
            dispatch(stopChatListening()).then(() => null)
        }
    },[])

    return <div>
        {status === 'error' && <div>Error occurred, refresh page</div>}
        <>
        <Messages />
        <AddChatMessageForm />
        </>
    </div>
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
        if(isActiveAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    },[messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m,index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
})
const Message: React.FC<{message: ChatMessageAPIType}> = React.memo(({message}) => {

    return <div>
        <img src={message.photo} style={{width: '40px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})
const AddChatMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if(!message) return
        dispatch(sendMessage(message)).then(() => console.log('3'))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage