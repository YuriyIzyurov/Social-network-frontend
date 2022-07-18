import React, {useEffect, useRef, useState} from "react"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogType, SelfPrivateMessageType} from "../../typings/types";
import {actions, handlingDialogs, handlingMessageList, ThunkType} from "../../redux/dialogReducer";
import {Button} from 'antd'
import {DownloadOutlined, FormOutlined, TeamOutlined, EllipsisOutlined} from '@ant-design/icons';
import './Dialogs.scss'
import {useDispatch, useSelector} from "react-redux";
import {getAuthID} from "../../redux/auth-selectors";
import {useAppDispatch} from "../../redux/reduxStore";
import {getActiveMessagePage, getMessageList, getMessagesOnPage} from "../../redux/dialog-selectors";
import {getAuthAvatar} from "../../redux/profile-selectors";
import Search from "antd/lib/input/Search";
import "./PrivateChat.scss"
import { SendMessageForm } from "../FormikForms/SendMessageForm";
import { DialogList } from "./DialogList";

type PropsMessagesType = {
    dialogs: Array<DialogType>
    privateMessageData: Array<SelfPrivateMessageType>
    handlingMessage: (id: number, body: string) => ThunkType
    userID: string
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = ({dialogs, privateMessageData,  handlingMessage, userID}) => {
    let id = +userID
    const isMe = useSelector(getAuthID)
    const authAvatar = useSelector(getAuthAvatar)
    const messageList = useSelector(getMessageList)
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)

    const dispatch = useDispatch()
    const thunkDispatch = useAppDispatch()

    useEffect(() => {
        thunkDispatch(handlingDialogs())
        return () => {
            dispatch(actions.clearDialogList())
        }
    }, [])
    useEffect(() => {
        if(id) thunkDispatch(handlingMessageList(id, activePage,messagesOnPage))
    }, [privateMessageData])

    const recipientAvatar = dialogs.find(elem => elem.id === id)?.photos.small

    let message = messageList.map( (m )=><Message key={m.id}
                                                     message={m.body}
                                                     avatar={m.senderId === isMe ? authAvatar : recipientAvatar}
                                                     date={m.addedAt}
                                                     isMe={m.senderId === isMe}
                                                     viewed={m.viewed}
    />)


        //todo: выделить в отдельный компонент

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isActiveAutoScroll, setActiveAutoScroll] = useState(false)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isActiveAutoScroll && setActiveAutoScroll(true)
        } else {
            isActiveAutoScroll && setActiveAutoScroll(false)
        }
    }

    const [filter, setFilter] = useState('')


    return <section className="home">
        <div className="chat">
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    <FormOutlined />
                </div>
                <div className="chat__sidebar-search">
                    <Search  placeholder="Поиск среди контактов" allowClear onChange={e => setFilter(e.target.value)} />
                </div>
                <div className="chat__sidebar-list">
                    <div onScroll={scrollHandler}>
                        <DialogList dialogs={dialogs} filter={filter}/>
                        <div ref={messagesAnchorRef}></div>
                    </div>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div></div>
                    <div className="chat__dialog-header-center">
                        <b className="chat__dialog-header-name">Yuriy Izyurov</b>
                        <div className="chat__dialog-header-status">
                            <span className="status status--online">Online</span>
                        </div>
                    </div>
                    <EllipsisOutlined style={{fontSize: "23px"}}/>
                </div>
                <div className="chat__dialog-messages">
                    {message}
                </div>
                <div className="chat__dialog-input">
                    <SendMessageForm id={id} handlingMessage={handlingMessage}/>
                </div>
            </div>
        </div>
    </section>
}

export default Dialogs