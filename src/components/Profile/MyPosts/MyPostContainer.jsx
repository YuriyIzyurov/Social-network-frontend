import MyPosts from "./MyPosts";
import {addNewPost, addSymbolPost} from "../../../redux/postReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        textArea: state.post.textArea,
        messagesData: state.post.messagesData
    }
}

const MyPostContainer = connect(mapStateToProps,{addSymbolPost, addNewPost})(MyPosts)

export default MyPostContainer