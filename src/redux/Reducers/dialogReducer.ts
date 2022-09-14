import {AllMessageType, DialogType, SelfPrivateMessageType, UserType, SpamDataType} from "typings";
import {AppStateType, InferActionsTypes} from "redux/reduxStore";
import {ThunkAction} from "redux-thunk/es/types";
import {dialogsAPI} from "api/dialogsAPI";
import {DeleteNotification, SpamNotification } from "constants/constants";
import {dialogActions} from "redux/Actions";



type InitialDialogStateType = typeof initialState
type ActionType = InferActionsTypes<typeof dialogActions>
export type ThunkDialogType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>



let initialState = {
    privateMessageData : [] as Array<SelfPrivateMessageType>,
    messagesList: [] as Array<AllMessageType>,
    textAreaMess : '',
    dialogs: [] as Array<DialogType>,
    activePage: 1,
    messagesOnPage: 20,
    isFetching: false,
    followInProcess: [] as Array<number>, //array of users ID is now following in process
    friendList: [] as Array<UserType>,
    dialogID: null as number | null,
    deletedMessages: [] as Array<SpamDataType>,
    redirectToDialogPage: false,
    numberOfNewMessages: 0
}

export  const dialogReducer = (state = initialState,action:ActionType ):InitialDialogStateType => {

    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                privateMessageData : [...state.privateMessageData, action.payload],
                textAreaMess : ''
            }
       case "SET_MESSAGES":
            return {
                ...state,
                messagesList : [...action.messages]
            }
        case "MUTATE_MESSAGE_LIST":
            return {
                ...state,
                messagesList : [...state.messagesList.map(item => {
                    if(item.id === action.messageId){
                        if(action.message) {
                            item.body = action.message
                        } else {
                            if(action.reason === 'spam') {
                                item.body = SpamNotification
                            }
                            if(action.reason === 'delete') {
                                item.body = DeleteNotification
                            }
                        }
                    }
                    return item
                })]
            }

        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs
            }
        case "CLEAR_DIALOG_LIST":
            return {
                ...state,
                dialogs: []
            }

        case  "IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_DIALOG_ID":
            return {
                ...state,
                dialogID: action.id
            }
        case "MARK_MESSAGE_ID_AS_DELETED":
            return {
                ...state,
                deletedMessages: [...state.deletedMessages, action.payload]
            }
        case "REMOVE_MARK_OF_DELETE":
            return {
                ...state,
                deletedMessages: [...state.deletedMessages.filter(item => item.messageId !== action.messageId)]
            }
        case "SET_REDIRECT_TO_DIALOG_PAGE":
            return {
                ...state,
                redirectToDialogPage: action.status
            }
        case "SET_NUMBER_OF_NEW_MESSAGES":
            return {
                ...state,
                numberOfNewMessages: action.number
            }
        default:
            return state
    }
}
export const handlingDialogs =  (): ThunkDialogType => {
    return async (dispatch, getState) => {
        dispatch(dialogActions.dialogListIsFetching(true))
        let response = await dialogsAPI.getAllDialogs()
        dispatch(dialogActions.dialogListIsFetching(false))
        dispatch(dialogActions.setDialogs(response))

    }
}

export const handlingMessage =  (id: number, body: string): ThunkDialogType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.sendMessageToFriend(id, body)
        dispatch(dialogActions.sendNewMessage(response.data.message))
    }
}

export const startDialogWithFriend = (id: number):ThunkDialogType => {
    return async (dispatch) => {
        let response = await dialogsAPI.startChatting(id)
        if(response.resultCode !== 0) {
            console.log('check')
        }
    }
}
export const handlingMessageList =  (id: number, activePage: number, messagesOnPage: number): ThunkDialogType => {
    return async (dispatch, getState) => {
        dispatch(dialogActions.dialogListIsFetching(true))
        let response = await dialogsAPI.getFriendMessagesList(id, activePage, messagesOnPage)
        dispatch(dialogActions.dialogListIsFetching(false))
        if(response.error) {
            console.log(response.error)
        } else {
            dispatch(dialogActions.setMessages(response.items))
        }
    }
}
export const handlingSpamMessage =  (messageId: string, message: string): ThunkDialogType => {
    return async (dispatch, getState) => {
        await dialogsAPI.markMessageAsSpam(messageId)
        dispatch(dialogActions.mutateMessageList(messageId, undefined ,'spam'))
        const payload:SpamDataType = {messageId, message}
        dispatch(dialogActions.markMessageIdAsDeleted(payload))
    }
}
export const handlingDeleteMessage =  (messageId: string, message: string): ThunkDialogType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.deleteMessage(messageId)
        console.log(response)
        dispatch(dialogActions.mutateMessageList(messageId, undefined, 'delete'))
        const payload:SpamDataType = {messageId, message}
        dispatch(dialogActions.markMessageIdAsDeleted(payload))
    }
}
export const handlingRestoreMessage =  (messageId: string, message:string | undefined): ThunkDialogType => {
    return async (dispatch, getState) => {
        await dialogsAPI.restoreDeletedMessage(messageId)
        dispatch(dialogActions.mutateMessageList(messageId,message))
        dispatch(dialogActions.deleteMark(messageId))
    }
}


