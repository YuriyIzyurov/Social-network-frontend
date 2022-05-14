const SENDMESSAGE = "SEND-MESSAGE"
const ADDSYMBOLMESS = "ADD-SYMBOL-MESS"

const dialogReducer = (state,action) => {
    switch (action.type) {
        case SENDMESSAGE:
            let newMessage = {
                message: state.textAreaMess,
                id: "5"
            }
            state.privateMessageData.push(newMessage)
            state.textAreaMess = ''
            break;
        case ADDSYMBOLMESS:
            state.textAreaMess = action.messText
            break;
    }

}
export const addNewSymbolMessage = (text) => ({type : ADDSYMBOLMESS, messText : text})
export const sendNewMessage = () => ({type : SENDMESSAGE})

export default dialogReducer