import MyPosts from "./MyPosts";

import {connect} from "react-redux";
import {compose} from "redux";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";
import {getMessagesData, getTextArea} from "../../../redux/post-selectors";
import {AppStateType} from "../../../redux/reduxStore";
import {MessagesDataType} from "../../../typings/types";
import { actions } from "../../../redux/profileReducer";
import {ComponentType} from "react";


let mapStateToProps = (state: AppStateType):{textArea:string, messagesData:Array<MessagesDataType> } => {
    return {
        textArea: getTextArea(state),
        messagesData: getMessagesData(state)
    }
}
let addNewPost = actions.addNewPost
export default compose<ComponentType>(
    connect(mapStateToProps, {addNewPost}),
    withRedirectIfNoAuth
)(MyPosts)

