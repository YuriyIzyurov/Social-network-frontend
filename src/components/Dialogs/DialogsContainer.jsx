import Dialogs from "./Dialogs";
import {actions} from "../../redux/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {getDialogData, getPrivateMessageData, getTextAreaMess} from "../../redux/dialog-selectors";

let mapStateToProps = (state) => {
    return {
        privateMessageData: getPrivateMessageData(state),
        DialogData: getDialogData(state),
        textAreaMess: getTextAreaMess(state)
    }
}

const sendNewMessage = actions.sendNewMessage
export default compose(
    connect(mapStateToProps, {sendNewMessage}),
    withRedirectIfNoAuth
)(Dialogs)

