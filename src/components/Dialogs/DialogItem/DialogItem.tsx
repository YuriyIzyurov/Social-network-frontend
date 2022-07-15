import React, {useEffect} from 'react';
import '../Dialogs.scss'
// @ts-ignore
import UnreadMessage from '../../../assets/images/noreaded.svg'
import {CustomTimeDistanceToNow, GetMessageTime} from "../../../utils/Time/CustomTime";
import isToday from 'date-fns/isToday';
import {format} from "date-fns";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../redux/reduxStore";
import {
    getLastMessage,
    handlingMessage,
    handlingMessageList,
    startDialogWithFriend
} from "../../../redux/dialogReducer";
import {useSelector} from "react-redux";
import {getActiveMessagePage, getMessagesOnPage} from "../../../redux/dialog-selectors";
import classnames from 'classnames';

const getCustomAvatar = (avatar: string | undefined) => {
    if(avatar) {
        return <img
            src={avatar}
            alt="User"/>
    } else {
        //create custom avatar
    }
}
let creationDate = "Tue Jul 13 2022 19:04:52"

type PropsType = {
    name: string
    id: number
    src: string | undefined
    hasNewMessages: boolean
    newMessagesCount: number
    date: string
    activityDate: string
}

const DialogItem: React.FC<PropsType> = ({name, id, src, hasNewMessages, newMessagesCount, date, activityDate}) => {

    const dispatch = useAppDispatch()
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)
    useEffect(() => {
        getLastMessage(id, activePage, 1)
    }, [])

    const getMessageList = () => {
       dispatch(handlingMessageList(id, activePage, messagesOnPage))
    }
    let dateDifference = Date.now() - (Date.parse(activityDate) + 1.08e+7)
    const onlineToggle = 1200000

    return (
            <Link to={"/dialogs/" + id} onClick={getMessageList} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className={classnames("dialog__item",{"dialog__item--online": dateDifference < onlineToggle})}>
                    <div className="dialog__item-avatar">
                        {getCustomAvatar(src)}
                    </div>
                    <div className="dialog__item-info">
                        <div className="dialog__item-info-top">
                            <b>{name}</b>
                            <span><GetMessageTime date={date}/></span>
                        </div>
                        <div className="dialog__item-info-bottom">
                            {dateDifference > onlineToggle && <p><CustomTimeDistanceToNow date={activityDate}/></p>}
                            {dateDifference < onlineToggle && <p>Здесь мы находим панель отображения css-свойств, и нажимаем на значок одного из</p>}
                            <img className="dialog__item-info-bottom-png" src={UnreadMessage} alt=""/>
                            {hasNewMessages && <div className="dialog__item-info-bottom-count">{newMessagesCount}</div>}
                        </div>
                    </div>
                </div>
            </Link>
    );
};

export default DialogItem;