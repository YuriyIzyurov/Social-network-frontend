import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../../common/Preloader/Preloader";
import {CurrentProfileType, UserType} from "../../typings/types";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {ThunkType} from "../../redux/profileReducer";
import "./Profile.scss"

type PropsType = {
    currentProfile: CurrentProfileType | null
    status:string
    updateMyStatus:() => void
    isShowMyProfile: boolean
    handlePhotoChange: (image: File) => ThunkType
    sendProfileDataOnServ:(newData:CurrentProfileType) => void

}

const Profile: React.FC<PropsType> = React.memo(({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange, sendProfileDataOnServ}) => {
    if(!currentProfile) return <Preloader/>
    return (
        <>
            <div className='profile__info'>
                <ProfileInfo currentProfile={currentProfile}
                             status={status}
                             updateMyStatus={updateMyStatus}
                             isShowMyProfile={isShowMyProfile}
                             handlePhotoChange={handlePhotoChange}
                             sendProfileDataOnServ={sendProfileDataOnServ}
                />
            </div>
        </>
    )
})

export default Profile