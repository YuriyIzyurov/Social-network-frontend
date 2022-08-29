import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "redux/reduxStore";
import {ChatMessage} from './ChatMessage';

export const ChatMessages: React.FC = React.memo(() => {
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
        {messages.map((m,index) => <ChatMessage key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
})