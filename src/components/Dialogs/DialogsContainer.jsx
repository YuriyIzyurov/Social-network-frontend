import Dialogs from "./Dialogs";
import {sendNewMessage} from "../../redux/dialogReducer";
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

export default compose(
    connect(mapStateToProps, {sendNewMessage}),
    withRedirectIfNoAuth
)(Dialogs)

