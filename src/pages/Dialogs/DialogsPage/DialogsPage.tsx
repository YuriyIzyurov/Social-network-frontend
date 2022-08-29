import React, {MouseEventHandler, useEffect, useState} from "react"
import {DialogType, SelfPrivateMessageType} from "typings/types";
import {actions, handlingDialogs, handlingMessageList, ThunkType} from "redux/dialogReducer";
import {Empty} from 'antd'
import {EllipsisOutlined, FormOutlined, TeamOutlined} from '@ant-design/icons';
import 'pages/Dialogs/DialogItem/DialogItem.scss'
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "redux/reduxStore";
import {getActiveMessagePage, getMessagesOnPage} from "redux/dialog-selectors";
import Search from "antd/lib/input/Search";
import "pages/Dialogs/DialogsPage/DialogsPage.scss"
import {SendMessageForm} from "components/FormikForms/SendMessageForm";
import {DialogList} from "pages/Dialogs/DialogsPage/DialogList";
import {MessagesList} from "pages/Dialogs/Message/MessagesList";
import {DialogHeader} from "pages/Dialogs/DialogsPage/DialogHeader";
import {Link} from "react-router-dom";
import StyledSearch from "components/StyledSearch";


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

const DialogsPage: React.FC<PropsMessagesType> = React.memo(({dialogs, privateMessageData,  handlingMessage, userID}) => {

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
            dispatch(actions.setDialogID(null))
        }
    }, [])
    useEffect(() => {
        if(id) thunkDispatch(handlingMessageList(id, activePage,messagesOnPage))
    }, [privateMessageData])

    const sendMessage = (value:string) => {
        setMessageSending(true)
        handlingMessage(id as number, value)

    }
    const [filter, setFilter] = useState('')

    const handleSetFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    return <section className="home">
        <div className="chat">
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <TeamOutlined />
                        <span>Список диалогов</span>
                    </div>
                    <div></div>
                </div>
                <div className="chat__sidebar-search">
                    <StyledSearch  handleSetFilter={handleSetFilter}/>
                </div>
                <div className="chat__sidebar-list">
                    <DialogList selectedId={id} dialogs={dialogs} filter={filter} />
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div></div> {/*специальный див для justify-content: space-between*/}
                    <DialogHeader dialogs={dialogs} id={id}/>
                    <EllipsisOutlined style={{fontSize: "23px"}}/>
                </div>
                <div className="chat__dialog-messages">
                    {userID && <MessagesList dialogs={dialogs} id={id} setMessageSending={setMessageSending} isMessageSending={isMessageSending}/>}
                    {!userID && <Empty className="chat__dialog-messages-empty" description="Выберите диалог"/>}
                </div>
                <div className="chat__dialog-input">
                    {userID && <SendMessageForm sendMessage={sendMessage}/>}
                </div>
            </div>
        </div>
    </section>
})

export default DialogsPage