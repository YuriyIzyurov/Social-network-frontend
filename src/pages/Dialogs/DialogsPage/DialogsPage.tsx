import React, {useEffect, useState} from "react"
import {DialogType, SelfPrivateMessageType} from "typings";
import {handlingDialogs, handlingMessageList, ThunkDialogType} from "redux/Reducers";
import {Empty} from 'antd'
import {EllipsisOutlined, TeamOutlined} from '@ant-design/icons';
import 'pages/Dialogs/DialogItem/DialogItem.scss'
import {useSelector} from "react-redux";
import {useAppDispatch} from "redux/reduxStore";
import {getActiveMessagePage, getMessagesOnPage} from "redux/Selectors";
import "pages/Dialogs/DialogsPage/DialogsPage.scss"
import {SendMessageForm} from "components/FormikInput/SendMessageForm";
import {DialogList, MessagesList,DialogHeader} from "pages/Dialogs";
import {StyledSearch} from "components/Forms";
import {dialogActions} from "redux/Actions";


type PropsType = {
    dialogs: Array<DialogType>
    privateMessageData: Array<SelfPrivateMessageType>
    handlingMessage: (id: number, body: string) => ThunkDialogType
    userID: number | null
}

const DialogsPage: React.FC<PropsType> = React.memo(({dialogs, privateMessageData,  handlingMessage, userID}) => {

    let id = userID
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)
    const [isMessageSending, setMessageSending] = useState(false)
    const [filter, setFilter] = useState('')
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(handlingDialogs())
        dispatch(dialogActions.setRedirectToDialogPage(false))
        return () => {
            dispatch(dialogActions.clearDialogList())
            dispatch(dialogActions.setDialogID(null))
            dispatch(dialogActions.setRedirectToDialogPage(false))
        }
    }, [])

    useEffect(() => {
        if(id) dispatch(handlingMessageList(id, activePage,messagesOnPage))
    }, [privateMessageData])

    const sendMessage = (value:string) => {
        setMessageSending(true)
        handlingMessage(id as number, value)
    }

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
                    <div></div>
                    <DialogHeader dialogs={dialogs} id={id}/>
                    <EllipsisOutlined style={{fontSize: "23px"}}/>
                </div>
                <div className="chat__dialog-messages">
                    {userID &&
                        <MessagesList
                            dialogs={dialogs}
                            id={id}
                            setMessageSending={setMessageSending}
                            isMessageSending={isMessageSending}/>}
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