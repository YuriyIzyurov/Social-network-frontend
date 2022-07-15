import {
    AllMessageType,
    DialogDataType,
    DialogType,
    PhotosType,
    PrivateMessageDataType,
    SelfPrivateMessageType,
    UserType
} from "../typings/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersAPI";
import {ThunkType as SidebarThunkType} from "./sidebarReducer";
import {actions as actionsUser} from "../redux/usersReducer"
import {actions as actionsSidebar} from "../redux/sidebarReducer"
import {ActionType as UserActionType} from "../redux/usersReducer"
import {ActionType as SidebarActionType} from "../redux/sidebarReducer"
import {ThunkAction} from "redux-thunk/es/types";
import {dialogsAPI} from "../api/dialogsAPI";
import {ResultCode} from "../api/api";
import {profileAPI} from "../api/profileAPI";



export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type FriendFilterType = {
    term: string
    friend: boolean
}

let initialState = {
    privateMessageData : [] as Array<SelfPrivateMessageType>,
    messagesList: [] as Array<AllMessageType>,
    lastMessage: [] as Array<string>,
    textAreaMess : '',
    dialogs: [] as Array<DialogType>,
    activePage: 1,
    messagesOnPage: 15,
    isFetching: false,
    followInProcess: [] as Array<number>, //array of users ID is now following in process
    friendList: [] as Array<UserType>,
}

const dialogReducer = (state = initialState,action:ActionType | UserActionType | SidebarActionType):InitialStateType => {

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
       case "LAST_MESSAGE":
            return {
                ...state,
                lastMessage : [...state.lastMessage, action.lastMessage]
            }
       case "CLEAR_MESSAGES":
            return {
                ...state,
                messagesList : []
            }

        case "SET_DIALOGS":
            return {
                ...state,
                dialogs: [...state.dialogs, ...action.dialogs]
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
        let date = new Date();
        console.log(date.toISOString().slice(0,23))
    }
}

export const startDialogWithFriend = (id: number):ThunkType => {
    return async (dispatch) => {
        let response = await dialogsAPI.startChatting(id)
    }
}
export const handlingMessageList =  (id: number, activePage: number, messagesOnPage: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.dialogListIsFetching(true))
        let response = await dialogsAPI.getFriendMessagesList(id, activePage, messagesOnPage)
        dispatch(actions.dialogListIsFetching(false))
        dispatch(actions.setMessages(response.items))

    }
}
export const getLastMessage =  (id: number, activePage: number, messagesOnPage: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.getFriendMessagesList(id, activePage, messagesOnPage)
        let lastMessage = response.items[messagesOnPage]
        dispatch(actions.setLastMessage(lastMessage))
    }
}



export const actions = {
    sendNewMessage: (messageData: SelfPrivateMessageType) => ({type : "SEND_MESSAGE", payload : messageData} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: "SET_DIALOGS", dialogs} as const),
    setMessages: (messages: Array<AllMessageType>) => ({type: "SET_MESSAGES", messages} as const),
    setLastMessage: (lastMessage: string) => ({type: "LAST_MESSAGE", lastMessage} as const),
    clearMessageList: () => ({type: "CLEAR_MESSAGES"} as const),
    setActiveDialogPage: (activePage:number) => ({type: "SET_ACTIVE_FRIEND_PAGE", activePage} as const),
    dialogListIsFetching: (isFetching:boolean) => ({type: "IS_FETCHING", isFetching} as const),
    clearDialogList: () => ({type: "CLEAR_DIALOG_LIST"} as const),
}

export default dialogReducer