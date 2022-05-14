import MyPosts from "./MyPosts";
import React from "react"
import {addNewPost, addSymbolPost} from "../../../redux/postReducer";


const MyPostContainer = (props) => {

    let state = props.store.getState().post
    let addNewSym = (text) => {
        props.store.dispatch(addSymbolPost(text))
    }
    let submitNewPost = () => {
        props.store.dispatch(addNewPost())
    }

    return (
        <div>
            <MyPosts textArea={state.textArea}
                     messagesData={state.messagesData}
                     addNewSym={addNewSym}
                     submitNewPost={submitNewPost}/>
        </div>
    )
}

export default MyPostContainer