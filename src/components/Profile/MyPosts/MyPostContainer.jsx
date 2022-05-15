import MyPosts from "./MyPosts";
import {addNewPost, addSymbolPost} from "../../../redux/postReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        textArea: state.post.textArea,
        messagesData: state.post.messagesData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addNewSym: (text) => {
            dispatch(addSymbolPost(text))
        },
        submitNewPost: () => {
            dispatch(addNewPost())
        }
    }
}
const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostContainer