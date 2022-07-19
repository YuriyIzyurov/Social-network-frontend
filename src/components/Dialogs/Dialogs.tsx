import React, {useEffect, useRef, useState} from "react"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogType, SelfPrivateMessageType} from "../../typings/types";
import {actions, handlingDialogs, handlingMessageList, ThunkType} from "../../redux/dialogReducer";
import {Button, Empty} from 'antd'
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
import { MessageList } from "./MessageList";
import { DialogHeader } from "./DialogHeader";

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
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)

    const dispatch = useDispatch()
    const thunkDispatch = useAppDispatch()

    const [isMessageSending, setMessageSending] = useState(false)

    useEffect(() => {
        thunkDispatch(handlingDialogs())
        return () => {
            dispatch(actions.clearDialogList())
        }
    }, [])
    useEffect(() => {
        if(id) thunkDispatch(handlingMessageList(id, activePage,messagesOnPage))
    }, [privateMessageData])


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
                    <DialogList dialogs={dialogs} filter={filter}/>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div></div> {/*специальный див для justify-content: space-between*/}
                    <DialogHeader dialogs={dialogs} id={id}/>
                    <EllipsisOutlined style={{fontSize: "23px"}}/>
                </div>
                <div className="chat__dialog-messages">
                    {!isNaN(id) && <MessageList dialogs={dialogs} id={id} setMessageSending={setMessageSending} isMessageSending={isMessageSending}/>}
                    {!id && <Empty className="chat__dialog-messages-empty" description="Выберите диалог"/>}
                </div>
                <div className="chat__dialog-input">
                    <SendMessageForm id={id} handlingMessage={handlingMessage} setMessageSending={setMessageSending}/>
                </div>
            </div>
        </div>
    </section>
}

export default Dialogs