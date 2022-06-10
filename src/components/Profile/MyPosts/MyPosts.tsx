import React, {memo} from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../../utils/validators/validators";
import {MessagesDataType} from "../../../typings/types";

type PropsType = {
    addNewPost: (text: string) => void
    messagesData: Array<MessagesDataType>
}
const MyPosts: React.FC<PropsType> = ({addNewPost, messagesData }) => {

    const onSubmit = (formData: any) => {
        if(formData.text) addNewPost(formData.text)
    }
    const post = [...messagesData].reverse().map(m=><Post message={m.post} likesCount={m.likesCount}  />)

    const PostForm = ({handleSubmit}:any) => {
        return <form onSubmit={handleSubmit}>
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