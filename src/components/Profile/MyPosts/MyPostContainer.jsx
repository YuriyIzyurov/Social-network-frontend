import MyPosts from "./MyPosts";
import {addNewPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";
import {getMessagesData, getTextArea} from "../../../redux/post-selectors";


let mapStateToProps = (state) => {
    return {
        textArea: getTextArea(state),
        messagesData: getMessagesData(state)
    }
}

export default compose(
    connect(mapStateToProps, {addNewPost}),
    withRedirectIfNoAuth
)(MyPosts)

