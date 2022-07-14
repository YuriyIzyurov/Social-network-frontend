import React, {useEffect} from 'react';
import '../Dialogs.scss'
// @ts-ignore
import UnreadMessage from '../../../assets/images/noreaded.svg'
import  {GetMessageTime} from "../../../utils/Time/CustomTime";
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
}

const DialogItem: React.FC<PropsType> = ({name, id, src, hasNewMessages, newMessagesCount}) => {

    const dispatch = useAppDispatch()
    let activePage = useSelector(getActiveMessagePage)
    let messagesOnPage = useSelector(getMessagesOnPage)
    useEffect(() => {
        getLastMessage(id, activePage, 1)
    }, [])

    const getMessageList = () => {
       dispatch(handlingMessageList(id, activePage, messagesOnPage))
    }

    return (
            <Link to={"/dialogs/" + id} onClick={getMessageList} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="dialog__item">
                    <div className="dialog__item-avatar">
                        {getCustomAvatar(src)}
                    </div>
                    <div className="dialog__item-info">
                        <div className="dialog__item-info-top">
                            <b>{name}</b>
                            <span><GetMessageTime date={creationDate}/></span>
                        </div>
                        <div className="dialog__item-info-bottom">
                            <p>Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует
                                сразу несколько подходов к подготовке таких материалов</p>
                            <img className="dialog__item-info-bottom-png" src={UnreadMessage} alt=""/>
                            {hasNewMessages && <div className="dialog__item-info-bottom-count">{newMessagesCount}</div>}
                        </div>
                    </div>
                </div>
            </Link>
    );
};

export default DialogItem;