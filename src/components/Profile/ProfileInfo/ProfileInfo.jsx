import React, {useState} from "react"
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userDefaultPhoto from '../../../assets/images/personal-user.png'
import ProfileData from "./ProfileData";
import ProfileDataInput from "./ProfileDataInput";



const ProfileInfo = ({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange,sendProfileDataOnServ }) => {

    const OnPhotoSelected = (onChange) => {
        if(onChange.target.files[0]) handlePhotoChange(onChange.target.files[0])
    }
    let [editMode, changeEditMode] = useState(false)

    return (
        <div>
            <div>
                <img src={currentProfile.photos.large || userDefaultPhoto}/>
            </div>
            <div>
                {!isShowMyProfile && <input type={"file"} onChange={OnPhotoSelected}/>}
            </div>
                <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>
            {!editMode && <ProfileData currentProfile={currentProfile}/>}
            {editMode && <ProfileDataInput currentProfile={currentProfile} sendProfileDataOnServ={sendProfileDataOnServ} changeEditMode={changeEditMode}/>}
            {!isShowMyProfile && <button onClick={(e) => {changeEditMode(true)}}>Edit</button>}
        </div>
    )


}


export default ProfileInfo