import React from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userDefaultPhoto from '../../../assets/images/personal-user.png'



const ProfileInfo = ({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange }) => {
    let Contact = ({socialMedia, contactValue} ) => {
        return <div>
                <b>{socialMedia}:</b>{contactValue}
        </div>
    }
    const OnPhotoSelected = (onChange) => {
        if(onChange.target.files[0]) handlePhotoChange(onChange.target.files[0])
    }
    return (
        <div>
            <div>
                <img src={currentProfile.photos.large || userDefaultPhoto}/>
            </div>
            <div>
                {!isShowMyProfile && <input type={"file"} onChange={OnPhotoSelected}/>}
            </div>
                <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>
            <div className={s.descriptionBlock}>
                <span>{currentProfile.fullName}</span>
            </div>
            <div>
                <b>About me:</b> {currentProfile.aboutMe}
            </div>
            <div>
                <b>Looking for a job:</b> {currentProfile.lookingForAJob ? "yes" : "no"}
            </div>
            <div>
                {currentProfile.lookingForAJob && <div><b>Looking for a job description:</b> {currentProfile.lookingForAJobDescription}</div>}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(currentProfile.contacts).map(key => {
               return  <Contact key={key} socialMedia={key} contactValue={currentProfile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

export default ProfileInfo