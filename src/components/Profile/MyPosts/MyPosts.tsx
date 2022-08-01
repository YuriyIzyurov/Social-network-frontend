import React, {memo} from "react"
import  './MyPosts.scss'
import Post from "./Post/Post";
import {Textarea} from "../../../common/FormsControl/Textarea";
import {maxLength200, minLength2} from "../../../utils/validators/validators";
import {MessagesDataType} from "../../../typings/types";
import banner from "../../../assets/images/Banner.png"
import {Rectangle} from "../../../assets/images/Web App UI Design/Rectangle";

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
    const post = [...messagesData].reverse().map(m=><Post key={Math.random()} message={m.post} likesCount={m.likesCount}  />)

    /*const PostForm: React.FC<InjectedFormProps<FormDataPostType, PropsType> & PropsType> = ({handleSubmit}) => {
        return <form onSubmit={handleSubmit}>
            <div>
                {/!*<Field component={Textarea} name={"text"} validate={[maxLength200, minLength2]}/>*!/}
            </div>
            <div>
                <button type={"submit"}>Add post</button>
            </div>
        </form>
    }*/

    /*let PostFormRedux = reduxForm<FormDataPostType, PropsType>({
        form: 'post'
    })(PostForm)*/

    return  (
        <div className="profile__posts">
            <div className="profile__posts-animation">
                <img src={banner} alt='banner'/>
            </div>
            <div className="profile__posts-recommended">
                <div className="description">
                    <span>Featured</span>
                    <span>See all</span>
                </div>
            </div>
            <div className="profile__posts-publications">
                <div className="post">
                    <img src='https://assets.unenvironment.org/decadeonrestoration/2020-03/nature-3294681_1280%20%281%29.jpg' alt='forest'/>
                    <div className="post__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt ut lacreet dolore.</p>
                    </div>
                </div>
                <div className="post">
                    <img src='https://bipbap.ru/wp-content/uploads/2018/04/00000_3-640x426.jpg' alt='forest'/>
                    <div className="post__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt utt.</p>
                    </div>
                </div>
                <div className="post">
                    <img src='https://shkolnaiapora.ru/wp-content/uploads/2019/03/%D0%9F%D1%83%D1%81%D1%82%D1%8B%D0%BD%D1%8F-%D0%A1%D0%B0%D1%85%D0%B0%D1%80%D0%B0.jpg' alt='forest'/>
                    <div className="post__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh.</p>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default MyPosts