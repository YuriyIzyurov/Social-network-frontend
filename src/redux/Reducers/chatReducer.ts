import {InferActionsTypes, BaseThunkType} from "redux/reduxStore";
import {chatAPI} from "api/chatAPI";
import {Dispatch} from "redux";
import {v1} from 'uuid';
import {ChatMessageAPIType, StatusType} from "typings";
import {chatActions} from "redux/Actions";



type initialChatStateType = typeof initialState
type ActionChatType = InferActionsTypes<typeof chatActions>
type ThunkChatType = BaseThunkType<ActionChatType>
type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export const chatReducer = (state = initialState,action:ActionChatType):initialChatStateType => {
    switch (action.type) {
        case "SET_NEW_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            }
        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        case "DELETE_MESSAGES":
            return {
                ...state,
                messages:[]
            }

        default:
            return state
    }
}
let _newMessageHandler:((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch)  => {
        if(_newMessageHandler === null) {
            _newMessageHandler = (messages) => {
                dispatch(chatActions.setNewMessages(messages))
            }
        }
        return _newMessageHandler
}


let _statusChangedHandler:((status: StatusType) => void) | null = null

const newStatusHandlerCreator = (dispatch: Dispatch)  => {
        if(_statusChangedHandler === null) {
            _statusChangedHandler = (status) => {
                dispatch(chatActions.changedStatus(status))
            }
        }
        return _statusChangedHandler
}

export const startChatListening = ():ThunkChatType =>  async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch))

    }
 export const stopChatListening = ():ThunkChatType =>  async (dispatch) => {
       chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
       chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
       chatAPI.stop()
       dispatch(chatActions.deleteMessages())
    }
 export const sendMessage = (message: string):ThunkChatType =>  async (dispatch) => {
       chatAPI.sendMessage(message)
    }




