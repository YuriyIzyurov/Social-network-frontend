import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import Preloader from "../../common/Preloader/Preloader";







const Profile = (props) => {
    if(!props.currentProfile) return <Preloader/>
    return (
        <div>
            <ProfileInfo currentProfile={props.currentProfile}/>
            <MyPostContainer />
        </div>
    )
}


export default Profile