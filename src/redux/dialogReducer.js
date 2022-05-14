const SENDMESSAGE = "SEND-MESSAGE"
const ADDSYMBOLMESS = "ADD-SYMBOL-MESS"

let initialState = {
    privateMessageData : [
        {message: "Hi are you?", id: "1"},
        {message: "Whats is going on?", id: "2"},
        {message: "Nice 2 meet u", id: "3"}],
    textAreaMess : '',
    DialogData : [
        {name: "Anton", id: "1", src:'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'},
        {name: "Vasya", id: "2", src:'https://cspromogame.ru//storage/upload_images/avatars/1299.jpg'},
        {name: "Egor", id: "3", src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyQ3Ez7fGNDmuULcJxaGc3CxZ5ohwAoFeGQ&usqp=CAU'},
        {name: "Anna", id: "4", src:'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg'},
        {name: "Dmitriy", id: "5", src:'http://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'}]
}
const dialogReducer = (state = initialState,action) => {
    switch (action.type) {
        case SENDMESSAGE:
            let newMessage = {
                message: state.textAreaMess,
                id: "5"
            }
            state.privateMessageData.push(newMessage)
            state.textAreaMess = ''
            return state;
        case ADDSYMBOLMESS:
            state.textAreaMess = action.messText
            return state
        default:
            return state
    }
}
export const addNewSymbolMessage = (text) => ({type : ADDSYMBOLMESS, messText : text})
export const sendNewMessage = () => ({type : SENDMESSAGE})

export default dialogReducer