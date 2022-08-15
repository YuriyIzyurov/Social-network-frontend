import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../../common/Preloader/Preloader";
import {CurrentProfileType, UserType} from "../../typings/types";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {ThunkType} from "../../redux/profileReducer";
import "./Profile.scss"
import {useSelector} from "react-redux";
import {getCurrentProfile, getStatus} from "../../redux/profile-selectors";
import {useAppDispatch} from "../../redux/reduxStore";


const Profile = React.memo(() => {

    const currentProfile = useSelector(getCurrentProfile)

    if(!currentProfile) return <Preloader/>
    return (
        <>
            <div className='profile__info'>
                <ProfileInfo currentProfile={currentProfile}/>
            </div>
        </>
    )
})

export default Profile