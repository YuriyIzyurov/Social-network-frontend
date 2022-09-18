import React from 'react';
import {CopyToClipBoardData} from "components/Main/RightSidebar/CopyToClipBoardData";


export const AuthData = () => {

    return (
        <div className="profile__info-login-authInfo">
            <CopyToClipBoardData name="Логин" data="free@samuraijs.com"/>
            <CopyToClipBoardData name="Пароль" data="free"/>
        </div>
    );
};
