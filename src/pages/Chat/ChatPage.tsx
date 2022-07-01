import React, {useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <Chat />
}

const Chat: React.FC = () => {
    return <div>
        <Messages />
        <AddChatMessageForm />
    </div>
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() =>{
        ws.addEventListener('message',(e) => {
            setMessages((prevMessages) => [...prevMessages,...JSON.parse(e.data)])
        })
    },[])

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m,index) => <Message key={index} message={m}/>)}
    </div>
}
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '40px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
const AddChatMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if(!message) return
        ws.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage