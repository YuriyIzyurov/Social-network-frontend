import React from "react"
import s from './Profile.module.css'
import MyPosts from "../MyPosts/MyPosts";
import Post from "../MyPosts/Post/Post";

const Profile = () => {
    return <div>
        <div>
            <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/04/06/69/4958106611a2dbe.jpg'/>
        </div>
        <div>
            ava+descr
        </div>
        <MyPosts/>
        <Post message='Hi are u?' likesCount='5'/>
        <Post message='Vpered' likesCount='22'/>
        <Post/>
        <Post/>
    </div>

}

export default Profile