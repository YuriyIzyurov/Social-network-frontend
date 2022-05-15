import Dialogs from "./Dialogs";
import {addNewSymbolMessage, sendNewMessage} from "../../redux/dialogReducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        privateMessageData: state.dialog.privateMessageData,
        DialogData: state.dialog.DialogData,
        textAreaMess: state.dialog.textAreaMess
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => dispatch(sendNewMessage()),
        addNewSymMessage:(text) => dispatch(addNewSymbolMessage(text))
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export default DialogsContainer