import MyPosts from "./MyPosts";
import {addNewPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";
import {getMessagesData, getTextArea} from "../../../redux/post-selectors";
import {AppStateType} from "../../../redux/reduxStore";
import {MessagesDataType} from "../../../typings/types";


let mapStateToProps = (state: AppStateType):{textArea:string, messagesData:Array<MessagesDataType> } => {
    return {
        textArea: getTextArea(state),
        messagesData: getMessagesData(state)
    }
}

export default compose(
    connect(mapStateToProps, {addNewPost}),
    withRedirectIfNoAuth
)(MyPosts)

