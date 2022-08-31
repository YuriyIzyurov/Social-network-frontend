import React from 'react';
import {CopyToClipBoardData} from "components/Main/RightSidebar/CopyToClipBoardData";


export const AuthData = () => {

    return (
        <div className="profile__info-login-authInfo">
            <CopyToClipBoardData name="Login" data="diecnc@yandex.ru"/>
            <CopyToClipBoardData name="Password" data="E8q_9MLDDYv9c5v"/>
        </div>
    );
};
