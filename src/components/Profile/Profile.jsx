import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import Preloader from "../../common/Preloader/Preloader";

const Profile = ({currentProfile, status, updateMyStatus }) => {
    if(!currentProfile) return <Preloader/>
    return (
        <div>
            <ProfileInfo currentProfile={currentProfile} status={status} updateMyStatus={updateMyStatus}/>
            <MyPostContainer />
        </div>
    )
}

export default Profile