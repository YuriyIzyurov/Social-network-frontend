import React, {FocusEventHandler, useState} from "react"
import 'pages/Dialogs/Message/Message.scss'
import {DeleteOutlined, ExclamationCircleOutlined, StopOutlined} from '@ant-design/icons';
import classNames from "classnames";
import classnames from "classnames";
import {GetMessageTime} from "utils/Time/CustomTime";
import MessageReadImage from "assets/images/readed.svg"
import MessageNoReadImage from "assets/images/noreaded.svg"
import {Modal} from "antd";
import {useAppDispatch} from "redux/reduxStore";
import {handlingDeleteMessage, handlingRestoreMessage, handlingSpamMessage} from "redux/Reducers/dialogReducer";
import {useSelector} from "react-redux";
import {getListOfDeletedMessages} from "redux/Selectors/dialog-selectors";
import { SpamNotification } from "constants/constants";

const { confirm } = Modal;

type PropsType = {
    message: string
    avatar: string | undefined
    date: string
    isMe: boolean
    viewed: boolean
    messageId: string
}
export const Message: React.FC<PropsType> = React.memo(({message, messageId, avatar, date, isMe,viewed}) => {

    const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false)
    const [isOptionsHovered, setOptionsHovered] = useState<boolean>(false)
    const listOfDeletedMessages = useSelector(getListOfDeletedMessages)
    const dispatch = useAppDispatch()

    const isDeleted = listOfDeletedMessages.find(item => item.messageId === messageId)
    const spamMessage = message === SpamNotification

    const handleOptions = () => {
        setOptionsVisible(!isOptionsVisible)
    }
    const handleBlur:FocusEventHandler<HTMLDivElement> = (event) => {
            if (!isOptionsHovered) {
                setOptionsVisible(false);
            }
    }
    const signAsSpam = async () => {
        dispatch(handlingSpamMessage(messageId, message))
            .then(() => setOptionsVisible(false))
    }
    const signAsDeleted = async () => {
        dispatch(handlingDeleteMessage(messageId, message))
            .then(() => setOptionsVisible(false))
    }
    const handleRestore = () => {
        dispatch(handlingRestoreMessage(messageId, isDeleted?.message))
    }
    const showMarkAsSpanConfirm = () => {
        confirm({
            title: 'Пометить сообщение как спам?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                signAsSpam()
            },
            onCancel() {
                setOptionsVisible(false)
            },
        });
    };
    const showDeleteConfirm = () => {
        confirm({
            title: 'Удалить сообщение?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                signAsDeleted()
            },
            onCancel() {
                setOptionsVisible(false)
            },
        });
    };
    const handleSpam = (e: React.MouseEvent<HTMLSpanElement>) => {
        showMarkAsSpanConfirm()
    }
    const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
        showDeleteConfirm()
    }

    return <div className={classNames("message", {"message--isMe": isMe})}>
        <div className="message__content">
            <div className="message__content-info">
                <div className="message__content-info-avatar">
                    <img src={avatar} alt="User"/>
                </div>
                    <div
                        className={classnames("message__content-info-bubble",{"deleted-message":isDeleted})}
                        tabIndex={0}
                        onClick={handleOptions}
                        onBlur={handleBlur}
                    >
                        <p>{message}</p>
                    </div>
                {!isDeleted && !spamMessage
                    ?
                    <div className="message__content-info-options">
                        {isOptionsVisible
                            ?
                            <div className="deleteAndSpam">
                                {!isMe && <StopOutlined
                                    onClick={handleSpam}
                                    onMouseEnter={() => setOptionsHovered(true)}
                                    onMouseLeave={() => setOptionsHovered(false)}
                                />}
                                <DeleteOutlined
                                    onClick={handleDelete}
                                    onMouseEnter={() => setOptionsHovered(true)}
                                    onMouseLeave={() => setOptionsHovered(false)}/>
                            </div>
                            :
                            <div></div>}
                        {viewed && !isOptionsVisible && <img src={MessageReadImage} alt=""/>}
                        {!viewed && !isOptionsVisible && <img src={MessageNoReadImage} alt=""/>}
                    </div>
                    :
                    <span className="spam-restore" onClick={handleRestore}>Восстановить</span>}
            </div>
            <div className="message__content-date">
                <GetMessageTime date={date} showFullDate={false}/>
            </div>
        </div>
    </div>
})

