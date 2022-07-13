import React from 'react';
import '../Dialogs.scss'
// @ts-ignore
import UnreadMessage from '../../../assets/images/noreaded.svg'
import CustomTime from "../../../utils/Time/CustomTime";
import isToday from 'date-fns/isToday';
import {format} from "date-fns";
import {Link, NavLink} from "react-router-dom";

const getCustomAvatar = (avatar: string | undefined) => {
    if(avatar) {
        return <img
            src={avatar}
            alt="User"/>
    } else {
        //create custom avatar
    }
}
let date = new Date()//"Tue Jul 12 2022 19:04:52"
const getMessageTime = (created_at: any) => {
    if(isToday(created_at)) {
        return format(created_at, "HH:mm")
    } else {
        return format(created_at, "DD.MM.YYYY")
    }
}
type PropsType = {
    name: string
    id: number
    src: string | undefined
}
const DialogItem: React.FC<PropsType> = ({name, id, src}) => {
    return (
            <Link to={"/dialogs/" + id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="dialog__item">
                    <div className="dialog__item-avatar">
                        {getCustomAvatar(src)}
                    </div>
                    <div className="dialog__item-info">
                        <div className="dialog__item-info-top">
                            <b>{name}</b>
                            <span>{getMessageTime(date)}</span>
                            {/*<span>
                        <CustomTime date={new Date()}/>
                    </span>*/}
                        </div>
                        <div className="dialog__item-info-bottom">
                            <p>Написание текстов для главных страниц сайта – дело непростое. Проблема в том, что существует
                                сразу несколько подходов к подготовке таких материалов</p>
                            <img className="dialog__item-info-bottom-png" src={UnreadMessage} alt=""/>
                            {/*<div className="dialog__item-info-bottom-count">5</div>*/}
                        </div>
                    </div>
                </div>
            </Link>
    );
};

export default DialogItem;