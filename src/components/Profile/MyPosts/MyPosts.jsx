import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";


const MyPosts = (props) => {

    const onSubmit = (formData) => {
        props.addNewPost(formData.text)
    }
    const post = props.messagesData.map(m=><Post message={m.post} likesCount={m.likesCount}  />)

    const PostForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"text"}/>
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    }

    let PostFormRedux = reduxForm({
        form: 'post'
    })(PostForm)

    return <div className='content'>
        <div>
            my post
            <PostFormRedux onSubmit={onSubmit}/>
        </div>
        <div className={s.posts}>
            {post}
        </div>
    </div>

}

export default MyPosts