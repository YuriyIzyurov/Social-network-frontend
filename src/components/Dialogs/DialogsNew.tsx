import React from 'react';
import './Dialogs.scss'
import DialogItem from "./DialogItem/DialogItem";

const DialogsNew = () => {
    return (
        <div className="dialog">
            <DialogItem/>
            <DialogItem/>
            <DialogItem/>
            <DialogItem/>
        </div>
    );
};

export default DialogsNew;