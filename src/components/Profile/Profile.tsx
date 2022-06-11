import React from "react"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// @ts-ignore
import Preloader from "../../common/Preloader/Preloader";
import {CurrentProfileType} from "../../typings/types";
import MyPostContainer from "./MyPosts/MyPostContainer";

type PropsType = {
    currentProfile: CurrentProfileType
    status:string
    updateMyStatus:() => void
    isShowMyProfile: boolean
    handlePhotoChange: () => void
    sendProfileDataOnServ:(newData:CurrentProfileType) => void

}

const Profile: React.FC<PropsType> = ({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange, sendProfileDataOnServ}) => {
    if(!currentProfile) return <Preloader/>
    return (
        <div>
            <ProfileInfo currentProfile={currentProfile}
                         status={status}
                         updateMyStatus={updateMyStatus}
                         isShowMyProfile={isShowMyProfile}
                         handlePhotoChange={handlePhotoChange}
                         sendProfileDataOnServ={sendProfileDataOnServ}/>
            {/*<MyPostContainer/>*/}
        </div>
    )
}

export default Profile