import Dialogs from "./Dialogs";
import React from "react";
import {addNewSymbolMessage, sendNewMessage} from "../../redux/dialogReducer";

const DialogsContainer = (props) => {

    let state = props.store.getState().dialog
    let sendMessage = () => {
        props.store.dispatch(sendNewMessage())
    }
    let addNewSymMessage = (text) => {
        props.store.dispatch(addNewSymbolMessage(text))
    }

    return (
        <div>
            <Dialogs privateMessageData={state.privateMessageData}
                     DialogData={state.DialogData}
                     textAreaMess={state.textAreaMess}
                     sendMessage={sendMessage}
                     addNewSymMessage={addNewSymMessage}
            />
        </div>
    )
}

export default DialogsContainer