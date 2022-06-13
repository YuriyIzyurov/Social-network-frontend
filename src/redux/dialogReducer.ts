import {InferActionsTypes} from "./reduxStore";


type PrivateMessageDataType = {
    message: string
    id: number
}
type DialogDataType = {
    name: string
    id: number
    src: string
}
export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>

let initialState = {
    privateMessageData : [
        {message: "Hi are you?", id: 1},
        {message: "Whats is going on?", id: 2},
        {message: "Nice 2 meet u", id: 3}] as Array<PrivateMessageDataType>,
    textAreaMess : '',
    DialogData : [
        {name: "Anton", id: 1, src:'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'},
        {name: "Vasya", id: 2, src:'https://cspromogame.ru//storage/upload_images/avatars/1299.jpg'},
        {name: "Egor", id: 3, src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyQ3Ez7fGNDmuULcJxaGc3CxZ5ohwAoFeGQ&usqp=CAU'},
        {name: "Anna", id: 4, src:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg'},
        {name: "Dmitriy", id: 5, src:'http://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'}] as Array<DialogDataType>
}

const dialogReducer = (state = initialState,action:ActionType):InitialStateType => {

    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                privateMessageData : [...state.privateMessageData, {message: action.messageText, id: 5}],
                textAreaMess : ''
            }
        default:
            return state
    }
}
export const actions = {
    sendNewMessage: (text:string) => ({type : "SEND_MESSAGE", messageText : text} as const)
}

export default dialogReducer