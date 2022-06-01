import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../../utils/validators/validators";


const MyPosts = (props) => {

    const onSubmit = (formData) => {
        if(formData.text) props.addNewPost(formData.text)
    }
    const post = props.messagesData.map(m=><Post message={m.post} likesCount={m.likesCount}  />)

    const PostForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"text"} validate={[maxLength200, minLength2]}/>
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    }

    let PostFormRedux = reduxForm({
        form: 'post'
    })(PostForm)

    return <div>
        <div>
            my post
        </div>
        <div className={s.posts}>
            <PostFormRedux onSubmit={onSubmit}/>
            {post}
        </div>
    </div>

}

export default MyPosts