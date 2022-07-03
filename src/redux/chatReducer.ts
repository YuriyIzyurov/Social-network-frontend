
import {InferActionsTypes, BaseThunkType} from "./reduxStore";
import {chatAPI, ChatMessageAPIType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {v1} from 'uuid';


export type initialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionType>
export type StatusType = 'pending' | 'ready' | 'error'
type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}
v1()
const chatReducer = (state = initialState,action:ActionType):initialStateType => {
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
                dispatch(actions.setNewMessages(messages))
            }
        }
        return _newMessageHandler
}


let _statusChangedHandler:((status: StatusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch)  => {
        if(_statusChangedHandler === null) {
            _statusChangedHandler = (status) => {
                dispatch(actions.changedStatus(status))
            }
        }
        return _statusChangedHandler
}

export const startChatListening = ():ThunkType =>  async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
        chatAPI.subscribe('status-changed', newStatusHandlerCreator(dispatch))

    }
 export const stopChatListening = ():ThunkType =>  async (dispatch) => {
       chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
       chatAPI.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
       chatAPI.stop()
       dispatch(actions.deleteMessages())
    }
 export const sendMessage = (message: string):ThunkType =>  async (dispatch) => {
       chatAPI.sendMessage(message)
    }



export const actions = {
    setNewMessages: (messages: ChatMessageAPIType[]) => ({type : "SET_NEW_MESSAGES", payload : {messages}} as const),
    changedStatus: (status: StatusType) => ({type : "STATUS_CHANGED", payload : {status}} as const),
    deleteMessages: () => ({type : "DELETE_MESSAGES"} as const)
}



export default chatReducer