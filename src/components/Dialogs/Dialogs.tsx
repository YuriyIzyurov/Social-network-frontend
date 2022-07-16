import React, {useEffect} from "react"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../utils/validators/validators";
import {DialogType, SelfPrivateMessageType} from "../../typings/types";
import {actions, handlingDialogs, handlingMessageList, ThunkType} from "../../redux/dialogReducer";
import {Button} from 'antd'
import {DownloadOutlined, FormOutlined, TeamOutlined} from '@ant-design/icons';
import './Dialogs.scss'
import {useDispatch, useSelector} from "react-redux";
import {getAuthID} from "../../redux/auth-selectors";
import {useAppDispatch} from "../../redux/reduxStore";
import {getActiveMessagePage, getMessageList, getMessagesOnPage} from "../../redux/dialog-selectors";
import {getAuthAvatar} from "../../redux/profile-selectors";
import Search from "antd/lib/input/Search";
import "./PrivateChat.scss"

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

    let recipientAvatar = dialogs.find(elem => elem.id === id)?.photos.small

    let dialog = dialogs.map(n=><DialogItem name={n.userName}
                                            key={n.id}
                                            id={n.id}
                                            src={n.photos.small}
                                            hasNewMessages={n.hasNewMessages}
                                            newMessagesCount={n.newMessagesCount}
                                            date={n.lastDialogActivityDate}
                                            activityDate={n.lastUserActivityDate}
    />)


    let message = messageList.map( (m )=><Message key={m.id}
                                                     message={m.body}
                                                     avatar={m.senderId === isMe ? authAvatar : recipientAvatar}
                                                     date={m.addedAt}
                                                     isMe={m.senderId === isMe}
                                                     viewed={m.viewed}
    />)

    const onSubmit = (formData: FormDataMessageType) => {
        handlingMessage(id, formData.message)

    }

    const DialogForm: React.FC<InjectedFormProps<FormDataMessageType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field component={Textarea} name={"message"} validate={[maxLength200, minLength2]}/>
                </div>
                <div>
                    <button type="submit">
                        Send message
                    </button>
                </div>
            </div>
        </form>
    }

    let DialogFormRedux = reduxForm<FormDataMessageType, PropsType>({
        form: 'dialog'
    })(DialogForm)

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
                    <Search  placeholder="Поиск среди контактов" allowClear onSearch={() => console.log("search")} />
                </div>
                <div className="chat__sidebar-list">
                    {dialog}
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div className="chat__dialog-header-center">
                        <b className="chat__dialog-name">Yuriy Izyurov</b>
                        <div className="chat__dialog-status">
                            <div className="status status--online">Online</div>s
                        </div>
                    </div>
                </div>
                <div className="chat__dialog-messages">
                    {message}
                </div>
                <div className="chat__dialog-input">
                    <DialogFormRedux onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    </section>
    /*return <div>
        <Row>
            <Col span={8}>
                <div className="dialog">
                    {dialog}
                </div>
            </Col>
            <Col span={16}>
                {message}
                <DialogFormRedux onSubmit={onSubmit}/>
            </Col>
        </Row>
    </div>*/

}

export default Dialogs