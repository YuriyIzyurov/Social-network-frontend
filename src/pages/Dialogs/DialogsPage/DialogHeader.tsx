import React from 'react';
import 'pages/Dialogs/DialogsPage/DialogsPage.scss'
import {DialogType} from "typings";
import {isUserOnline} from "utils/Time/isUserOnline";
import classnames from 'classnames';

type PropsType = {
    dialogs: DialogType[]
    id: number | null
}

export const DialogHeader: React.FC<PropsType> = React.memo(({dialogs, id}) => {

    if(dialogs.length && id) {
        const userName = dialogs.find(dialog => dialog.id === id)
        const isOnline = isUserOnline(userName!.lastUserActivityDate)

    return (
        <div className="chat__dialog-header-center">
            <b className="chat__dialog-header-name">{userName?.userName}</b>
            <div className="chat__dialog-header-status">
                 <span className={classnames("status", {"status--online": isOnline})}>
                    {isOnline ? <span>Online</span> : <span>Offline</span>}
                </span>
            </div>
        </div>
    );
    } else {
        return <div></div>
    }
})

