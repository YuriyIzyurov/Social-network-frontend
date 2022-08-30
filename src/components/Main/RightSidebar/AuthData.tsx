import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';


export const AuthData = () => {

    const [copiedFirst, setCopiedFirst] = useState<boolean>(false)
    const [copiedSecond, setCopiedSecond] = useState<boolean>(false)

    const handleCopyFirst = () => {
        setCopiedFirst(true)
        setTimeout(() =>{
            setCopiedFirst(false)
        }, 300)
    }
    const handleCopySecond = () => {
        setCopiedSecond(true)
        setTimeout(() =>{
            setCopiedSecond(false)
        }, 300)
    }

    return (
        <div className="profile__info-login-authInfo">
            <div className="authInfo-data">
                <span style={{ paddingRight: '33px'}}>
                    Login:
                </span>
                <span>diecnc@yandex.ru</span>
                <CopyToClipboard text={"diecnc@yandex.ru"}
                                 onCopy={handleCopyFirst}>
                    <CopyOutlined/>
                </CopyToClipboard>
                <span className={copiedFirst ? "descr" : ''}>Copied!</span>
            </div>
            <div  className="authInfo-data">
                <span style={{ paddingRight: '3px'}}>
                    Password:
                </span>
                <span>E8q_9MLDDYv9c5v</span>
                <CopyToClipboard text={"E8q_9MLDDYv9c5v"}
                                 onCopy={handleCopySecond}>
                    <CopyOutlined/>
                </CopyToClipboard>
                <span className={copiedSecond ? "descr" : ''}>Copied!</span>
            </div>
        </div>
    );
};
