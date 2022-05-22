import MyPosts from "./MyPosts";
import {addNewPost, addSymbolPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        textArea: state.profile.textArea,
        messagesData: state.profile.messagesData
    }
}

const MyPostContainer = connect(mapStateToProps,{addSymbolPost, addNewPost})(MyPosts)

export default MyPostContainer