import MyPosts from "./MyPosts";
import {addNewPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        textArea: state.profile.textArea,
        messagesData: state.profile.messagesData
    }
}

const MyPostContainer = connect(mapStateToProps,{addNewPost})(MyPosts)

export default MyPostContainer