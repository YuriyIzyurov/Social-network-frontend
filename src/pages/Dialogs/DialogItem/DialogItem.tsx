import React, {useState} from 'react';
import 'pages/Dialogs/DialogItem/DialogItem.scss'
import {CustomTimeDistanceToNow, GetMessageTime} from "utils/Time/CustomTime";
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {useAppDispatch} from "redux/reduxStore";
import {handlingDialogs, handlingMessageList} from "redux/Reducers";
import {useSelector} from "react-redux";
import {getActiveMessagePage, getMessagesOnPage} from "redux/Selectors";
import classnames from 'classnames';
import {isUserOnline} from 'utils/Time/isUserOnline';
import {Modal, Tooltip} from "antd";
import {dialogsAPI} from "api/dialogsAPI";
import {GradientCharAvatar} from "components/CustomAvatars";
import {dialogActions} from "redux/Actions";

const { confirm } = Modal;

type PropsType = {
    name: string
    id: number
    src: string | undefined
    hasNewMessages: boolean
    newMessagesCount: number
    date: string
    activityDate: string
    selectedId: number | null
}

export const DialogItem: React.FC<PropsType> = React.memo(({name, id, src, hasNewMessages, newMessagesCount, date, activityDate, selectedId}) => {

    const dispatch = useAppDispatch()
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)
    const [isShown, setIsShown] = useState<boolean>(false);


    const error = () => {
        Modal.error({
            title: 'Невозможно удалить диалог',
        });
    };
    const removeDialog = async () => {
        error()
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Вы уверены, что хотите удалить диалог?',
            icon: <ExclamationCircleOutlined />,
            content: 'Восстановить сообщения будет невозможно',
            okText: 'Да',
            okButtonProps : {ghost : true},
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                removeDialog()
            },
        });
    };

    const checkNewMessages = async () => {
        const response =  await dialogsAPI.getNewMessages()
        dispatch(dialogActions.setNumberOfNewMessages(response))
    }

    const getMessageList = async () => {
        dispatch(handlingMessageList(id, activePage, messagesOnPage))
            .then(() => dispatch(handlingDialogs()))
            .then(() => checkNewMessages())
        dispatch(dialogActions.setDialogID(id))
    }
    const deleteDialog = (e:React.MouseEvent<HTMLSpanElement>) => {
        showDeleteConfirm()
        e.stopPropagation()
    }

    return (
                <div
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                    onClick={getMessageList}
                    className={classnames("dialog__item",
                    {
                        "dialog__item--online": isUserOnline(activityDate),
                        "dialog__item--selected": id === selectedId
                    })}>
                    <div className="dialog__item-avatar">
                        <GradientCharAvatar avatarUrl={src as string} name={name} height={'40px'}/>
                    </div>
                    <div className="dialog__item-info">
                        <div className={name.length < 17 ? "dialog__item-info-top" : "dialog__item-info-top dialog-name-font"}>
                            <b>{name}</b>
                            {!isShown && <span><GetMessageTime date={date} showFullDate={false}/></span>}
                            {isShown
                                &&
                                <Tooltip mouseLeaveDelay={0.05}
                                         mouseEnterDelay={0.6}
                                         title="Удалить диалог"
                                >
                                    <CloseOutlined onClick={deleteDialog}/>
                                </Tooltip>}
                        </div>
                        <div className="dialog__item-info-bottom">
                            {!isUserOnline(activityDate) && <p><CustomTimeDistanceToNow date={activityDate}/></p>}
                            {isUserOnline(activityDate) && <p>В сети</p>}
                            {hasNewMessages && <div className="dialog__item-info-bottom-count">{newMessagesCount}</div>}
                        </div>
                    </div>
                </div>
    );
})

