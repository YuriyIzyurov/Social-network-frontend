import React from "react"
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";





const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostContainer />
        </div>
    )
}


export default Profile