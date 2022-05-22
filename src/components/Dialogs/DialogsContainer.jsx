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

const DialogsContainer = connect(mapStateToProps, {sendNewMessage, addNewSymbolMessage})(Dialogs)
export default DialogsContainer