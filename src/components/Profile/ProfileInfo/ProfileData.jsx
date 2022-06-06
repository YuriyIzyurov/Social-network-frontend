import React from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";



const ProfileData = ({currentProfile}) => {
    let Contact = ({socialMedia, contactValue} ) => {
        return <div>
            <b>{socialMedia}:</b>{contactValue}
        </div>
    }
    return <div>
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
}

export default ProfileData