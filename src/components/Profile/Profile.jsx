import React from "react"
import s from './Profile.module.css'
import MyPosts from "../MyPosts/MyPosts";
import Post from "../MyPosts/Post/Post";

const Profile = () =>{
    return <div className={s.content}>
            <div>
                <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/04/06/69/4958106611a2dbe.jpg'/>
            </div>
            <div>
                ava+descr
            </div>
        <MyPosts />
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        </div>

}

export default Profile