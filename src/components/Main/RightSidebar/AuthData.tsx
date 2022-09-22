import React from 'react';
import {CopyToClipBoardData} from "components/Main/RightSidebar/CopyToClipBoardData";


export const AuthData = () => {

    return (
        <div className="profile__info-login-authInfo">
            <CopyToClipBoardData name="Логин" data="norowo8255@edxplus.com"/>
            <CopyToClipBoardData name="Пароль" data="WfytJebzwR4TQV"/>
        </div>
    );
};
