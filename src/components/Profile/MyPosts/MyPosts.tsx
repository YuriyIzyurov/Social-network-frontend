import React, {memo} from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../../utils/validators/validators";
import {MessagesDataType} from "../../../typings/types";

type PropsPostType = {
    addNewPost: (text: string) => void
    messagesData: Array<MessagesDataType>
}
type FormDataPostType = {
    text: string
}
type PropsType = {}

const MyPosts: React.FC<PropsPostType> = ({addNewPost, messagesData }) => {

    const onSubmit = (formData: FormDataPostType) => {
        if(formData.text) addNewPost(formData.text)
    }
    const post = [...messagesData].reverse().map(m=><Post message={m.post} likesCount={m.likesCount}  />)

    const PostForm: React.FC<InjectedFormProps<FormDataPostType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} name={"text"} validate={[maxLength200, minLength2]}/>
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    }

    let PostFormRedux = reduxForm<FormDataPostType, PropsType>({
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