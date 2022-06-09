import React, {useState} from "react"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
// @ts-ignore
import userDefaultPhoto from '../../../assets/images/personal-user.png'
import ProfileData from "./ProfileData";
import ProfileDataInput from "./ProfileDataInput";
import {CurrentProfileType} from "../../../typings/types";


type PropsType = {
    currentProfile: CurrentProfileType
    status:string
    updateMyStatus:() => void
    isShowMyProfile: boolean
    handlePhotoChange: (image: File) => any
    sendProfileDataOnServ:(newData:CurrentProfileType) => void

}
const ProfileInfo: React.FC<PropsType> = ({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange,sendProfileDataOnServ }) => {

    const OnPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) handlePhotoChange(e.target.files[0])
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