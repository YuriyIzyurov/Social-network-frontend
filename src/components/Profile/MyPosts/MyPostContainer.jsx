import MyPosts from "./MyPosts";
import {addNewPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";


let mapStateToProps = (state) => {
    return {
        textArea: state.profile.textArea,
        messagesData: state.profile.messagesData
    }
}

export default compose(
    connect(mapStateToProps, {addNewPost}),
    withRedirectIfNoAuth
)(MyPosts)

