import {AllMessageType, DialogType, SelfPrivateMessageType, UserType} from "typings/types";
import {AppStateType, InferActionsTypes} from "redux/reduxStore";
import {ActionType as UserActionType} from "redux/Reducers/usersReducer"
import {ThunkAction} from "redux-thunk/es/types";
import {dialogsAPI} from "api/dialogsAPI";
import {DeleteNotification, SpamNotification } from "constants/constants";




export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type FriendFilterType = {
    term: string
    friend: boolean
}
export type SpamDataType = {
    messageId:string
    message:string
}
type Delete = "delete"
type Spam = "spam"

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

const dialogReducer = (state = initialState,action:ActionType | UserActionType ):InitialStateType => {

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
       case "CLEAR_MESSAGES":
            return {
                ...state,
                messagesList : []
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
        case "SET_ACTIVE_FRIEND_PAGE":
            return {
                ...state,
                activePage: action.activePage
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
export const handlingDialogs =  (): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.dialogListIsFetching(true))
        let response = await dialogsAPI.getAllDialogs()
        dispatch(actions.dialogListIsFetching(false))
        dispatch(actions.setDialogs(response))

    }
}

export const handlingMessage =  (id: number, body: string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.sendMessageToFriend(id, body)
        dispatch(actions.sendNewMessage(response.data.message))
    }
}

export const startDialogWithFriend = (id: number):ThunkType => {
    return async (dispatch) => {
        let response = await dialogsAPI.startChatting(id)
        if(response.resultCode !== 0) {
            console.log('check')
        }
    }
}
export const handlingMessageList =  (id: number, activePage: number, messagesOnPage: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.dialogListIsFetching(true))
        let response = await dialogsAPI.getFriendMessagesList(id, activePage, messagesOnPage)
        dispatch(actions.dialogListIsFetching(false))
        if(response.error) {
            console.log(response.error)
        } else {
            dispatch(actions.setMessages(response.items))
        }
    }
}
export const handlingSpamMessage =  (messageId: string, message: string): ThunkType => {
    return async (dispatch, getState) => {
        await dialogsAPI.markMessageAsSpam(messageId)
        dispatch(actions.mutateMessageList(messageId, undefined ,'spam'))
        const payload:SpamDataType = {messageId, message}
        dispatch(actions.markMessageIdAsDeleted(payload))
    }
}
export const handlingDeleteMessage =  (messageId: string, message: string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.deleteMessage(messageId)
        console.log(response)
        dispatch(actions.mutateMessageList(messageId, undefined, 'delete'))
        const payload:SpamDataType = {messageId, message}
        dispatch(actions.markMessageIdAsDeleted(payload))
    }
}
export const handlingRestoreMessage =  (messageId: string, message:string | undefined): ThunkType => {
    return async (dispatch, getState) => {
        await dialogsAPI.restoreDeletedMessage(messageId)
        dispatch(actions.mutateMessageList(messageId,message))
        dispatch(actions.deleteMark(messageId))
    }
}



export const actions = {
    sendNewMessage: (messageData: SelfPrivateMessageType) => ({type : "SEND_MESSAGE", payload : messageData} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: "SET_DIALOGS", dialogs} as const),
    setMessages: (messages: Array<AllMessageType>) => ({type: "SET_MESSAGES", messages} as const),
    clearMessageList: () => ({type: "CLEAR_MESSAGES"} as const),
    setActiveDialogPage: (activePage:number) => ({type: "SET_ACTIVE_FRIEND_PAGE", activePage} as const),
    dialogListIsFetching: (isFetching:boolean) => ({type: "IS_FETCHING", isFetching} as const),
    clearDialogList: () => ({type: "CLEAR_DIALOG_LIST"} as const),
    setDialogID: (id:number | null) => ({type: "SET_DIALOG_ID", id} as const),
    mutateMessageList: (messageId:string, message?:string | undefined, reason?: Delete | Spam) => ({type: "MUTATE_MESSAGE_LIST", messageId,message,reason} as const),
    markMessageIdAsDeleted: (payload:SpamDataType) => ({type: "MARK_MESSAGE_ID_AS_DELETED", payload}as const),
    deleteMark: (messageId:string) => ({type: "REMOVE_MARK_OF_DELETE", messageId}as const),
    setRedirectToDialogPage: (status:boolean) => ({type: "SET_REDIRECT_TO_DIALOG_PAGE", status} as const),
    setNumberOfNewMessages: (number:number) => ({type: "SET_NUMBER_OF_NEW_MESSAGES", number} as const),
}

export default dialogReducer