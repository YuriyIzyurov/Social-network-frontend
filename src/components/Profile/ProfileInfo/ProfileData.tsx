import React from "react"
import s from './ProfileInfo.module.css'
import {CurrentProfileType} from "../../../typings/types";


const ProfileData: React.FC<{currentProfile: CurrentProfileType}> = ({currentProfile}) => {

    let Contact: React.FC<{socialMedia: string, contactValue: string}> = ({socialMedia, contactValue} ) => {
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
            <b>Contacts:</b> {Object.keys(currentProfile.contacts).map((key:any) => {
            return  <Contact key={key} socialMedia={key} contactValue={currentProfile.contacts[key]}/>
        })}
        </div>
    </div>
}

export default ProfileData