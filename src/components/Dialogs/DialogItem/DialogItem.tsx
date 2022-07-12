import React from 'react';
import '../Dialogs.scss'
// @ts-ignore
import UnreadMessage from '../../../assets/images/noreaded.svg'
import CustomTime from "../../../utils/Time/CustomTime";

const getCustomAvatar = (avatar: string) => {
    if(avatar) {
        return <img
            src={avatar}
            alt="User"/>
    } else {
        //create custom avatar
    }
}
const DialogItem = () => {
    return (
        <div className="dialog__item">
            <div className="dialog__item-avatar">
                {getCustomAvatar("https://sun1-57.userapi.com/s/v1/ig1/JYi_Ms2lLHXkb3MXHqwOV5u26RdJ1gwEfPChmxt7fBL73LUTB_xVhkbnXwfQjGfjZ4MpJdIi.jpg?size=100x100&quality=96&crop=661,238,1224,1224&ava=1")}
            </div>
            <div className="dialog__item-info">
                <div className="dialog__item-info-top">
                    <b>Юрий Изъюров</b>
                    <span>14:26</span>
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
    );
};

export default DialogItem;