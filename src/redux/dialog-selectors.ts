import {AppStateType} from "./reduxStore";

export const getTextAreaMess = (state:AppStateType) => {
    return state.dialog.textAreaMess
}

export const getPrivateMessageData = (state:AppStateType) => {
    return state.dialog.privateMessageData
}

export const getDialogData = (state:AppStateType) => {
    return state.dialog.DialogData
}