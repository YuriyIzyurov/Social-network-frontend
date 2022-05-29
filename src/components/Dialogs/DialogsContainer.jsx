import Dialogs from "./Dialogs";
import {addNewSymbolMessage, sendNewMessage} from "../../redux/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";

let mapStateToProps = (state) => {
    return {
        privateMessageData: state.dialog.privateMessageData,
        DialogData: state.dialog.DialogData,
        textAreaMess: state.dialog.textAreaMess
    }
}
export default connect(mapStateToProps, {sendNewMessage, addNewSymbolMessage})(withRedirectIfNoAuth(Dialogs))
