import {AppStateType} from "redux/reduxStore";

export const getTextAreaMess = (state:AppStateType) => {
    return state.dialog.textAreaMess
}

export const getPrivateMessageData = (state:AppStateType) => {
    return state.dialog.privateMessageData
}
export const getMessageList = (state:AppStateType) => {
    return state.dialog.messagesList
}

export const getDialogs = (state:AppStateType) => {
    return state.dialog.dialogs
}
//export const getUsersSuperSelector = createSelector
export const getRedirectDialogPage = (state:AppStateType) => {
    return state.dialog.redirectToDialogPage
}
export const getActiveMessagePage = (state:AppStateType) => {
    return state.dialog.activePage
}
export const getMessagesOnPage = (state:AppStateType) => {
    return state.dialog.messagesOnPage
}

export const getFriendsIsFetching = (state:AppStateType) => {
    return state.dialog.isFetching
}
export const getCurrentDialogID = (state:AppStateType) => {
    return state.dialog.dialogID
}
export const getListOfDeletedMessages = (state:AppStateType) => {
    return state.dialog.deletedMessages
}
export const getNumberOfNewMessages = (state:AppStateType) => {
    return state.dialog.numberOfNewMessages
}
