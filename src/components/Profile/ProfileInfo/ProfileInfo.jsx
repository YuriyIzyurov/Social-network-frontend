import React from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";



const ProfileInfo = (props) => {

    return (
        <div>
            <div>
                <img src={props.currentProfile.photos.large}/>
            </div>
                <ProfileStatusWithHooks status={props.status} updateMyStatus={props.updateMyStatus}/>
            <div>
                <span>{props.currentProfile.aboutMe}</span>
            </div>
            <div className={s.descriptionBlock}>
                <span>{props.currentProfile.fullName}</span>
            </div>
        </div>
    )
}

export default ProfileInfo