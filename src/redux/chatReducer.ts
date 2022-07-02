
import {InferActionsTypes, BaseThunkType} from "./reduxStore";
import {ChatMessageType} from "../pages/Chat/ChatPage";
import {chatAPI} from "../api/chatAPI";
import {Dispatch} from "redux";



export type initialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionType>

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState,action:ActionType):initialStateType => {
    switch (action.type) {
        case "SET_NEW_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }

        default:
            return state
    }
}
let _newMessageHandler:((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch)  => {
        if(_newMessageHandler === null) {
            _newMessageHandler = (messages) => {
                dispatch(actions.setNewMessages(messages))
            }
        }
        return _newMessageHandler
}

export const startChatListening = ():ThunkType =>  async (dispatch) => {

        chatAPI.subscribe(newMessageHandlerCreator(dispatch))
        chatAPI.start()
    }
 export const stopChatListening = ():ThunkType =>  async (dispatch) => {
       chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
       chatAPI.stop()
    }
 export const sendMessage = (message: string):ThunkType =>  async (dispatch) => {
       chatAPI.sendMessage(message)
    }



export const actions = {
    setNewMessages: (messages: ChatMessageType[]) => ({type : "SET_NEW_MESSAGES", payload : {messages}} as const)
}



export default chatReducer