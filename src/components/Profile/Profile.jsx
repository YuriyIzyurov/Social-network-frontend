import React from "react"
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import Post from "./MyPosts/Post/Post";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = (props) => {

    const post = props.messagesData.map(m=><Post message={m.post} likesCount={m.likesCount} />)
    return (
        <div>
            <ProfileInfo/>
            <MyPosts textArea={props.textArea}
                     addPost={props.addPost}
                     addNewSymbol={props.addNewSymbol}/>
            {post}
        </div>
    )
}


export default Profile