import React, {useEffect, useState} from "react"
import {DialogType, SelfPrivateMessageType} from "../../typings/types";
import {actions, handlingDialogs, handlingMessageList, ThunkType} from "../../redux/dialogReducer";
import {Empty} from 'antd'
import {EllipsisOutlined, FormOutlined, TeamOutlined} from '@ant-design/icons';
import './Dialogs.scss'
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/reduxStore";
import {getActiveMessagePage, getMessagesOnPage} from "../../redux/dialog-selectors";
import Search from "antd/lib/input/Search";
import "./PrivateChat.scss"
import {SendMessageForm} from "../FormikForms/SendMessageForm";
import {DialogList} from "./DialogList";
import {MessageList} from "./MessageList";
import {DialogHeader} from "./DialogHeader";
import {Link} from "react-router-dom";

type PropsMessagesType = {
    dialogs: Array<DialogType>
    privateMessageData: Array<SelfPrivateMessageType>
    handlingMessage: (id: number, body: string) => ThunkType
    userID: number | null
}
type FormDataMessageType = {
    message: string
}
type PropsType = {}

const Dialogs: React.FC<PropsMessagesType> = React.memo(({dialogs, privateMessageData,  handlingMessage, userID}) => {

    let id = userID
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
                    <Link to={`/posts/62edf411f4bd0d10e74f4e9b`}>
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    </Link>
                    <FormOutlined />
                </div>
                <div className="chat__sidebar-search">
                    <Search  placeholder="Поиск среди контактов" allowClear onChange={e => setFilter(e.target.value)} />
                </div>
                <div className="chat__sidebar-list">
                    <DialogList selectedId={id} dialogs={dialogs} filter={filter}/>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div></div> {/*специальный див для justify-content: space-between*/}
                    <DialogHeader dialogs={dialogs} id={id}/>
                    <EllipsisOutlined style={{fontSize: "23px"}}/>
                </div>
                <div className="chat__dialog-messages">
                    {userID && <MessageList dialogs={dialogs} id={id} setMessageSending={setMessageSending} isMessageSending={isMessageSending}/>}
                    {!userID && <Empty className="chat__dialog-messages-empty" description="Выберите диалог"/>}
                </div>
                <div className="chat__dialog-input">
                    {userID && <SendMessageForm id={id} handlingMessage={handlingMessage} setMessageSending={setMessageSending}/>}
                </div>
            </div>
        </div>
    </section>
})

export default Dialogs