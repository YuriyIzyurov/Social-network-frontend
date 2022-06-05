import React from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";



const ProfileInfo = ({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange }) => {

    const OnPhotoSelected = (onChange) => {
        handlePhotoChange(onChange.target.files[0])
    }
    return (
        <div>
            <div>
                <img src={currentProfile.photos.large}/>
            </div>
            <div>
                {!isShowMyProfile && <input type={"file"} onChange={OnPhotoSelected}/>}
            </div>
                <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>
            <div>
                <span>{currentProfile.aboutMe}</span>
            </div>
            <div className={s.descriptionBlock}>
                <span>{currentProfile.fullName}</span>
            </div>
        </div>
    )
}

export default ProfileInfo