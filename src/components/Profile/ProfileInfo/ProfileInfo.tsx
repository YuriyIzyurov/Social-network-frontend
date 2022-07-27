import React, {createRef, useState} from "react"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
// @ts-ignore
import UserDefaultPhoto from '../../../assets/images/UserDefaultPhoto'
import ProfileData from "./ProfileData";
import {CurrentProfileType} from "../../../typings/types";
import {ThunkType} from "../../../redux/profileReducer";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../../redux/reduxStore";
import {startDialogWithFriend} from "../../../redux/dialogReducer";
// @ts-ignore
import AvatarBorderFinal from "../../../assets/images/Web App UI Design/AvatarBorderFinal"
import AvatarEffect from "../../../assets/images/Web App UI Design/AvatarEffect";
import {svgList} from "../../../common/constants/ListSVG"
import {ProxyImageUrl} from "../../../utils/ChangeURL/ProxifyURL"
import {getTwoMainColors} from "../../../utils/Color/MainColorsThief"


type PropsType = {
    currentProfile: CurrentProfileType
    status:string
    updateMyStatus:() => void
    isShowMyProfile: boolean
    handlePhotoChange: (image: File) => ThunkType
    sendProfileDataOnServ:(newData:CurrentProfileType) => void

}
const ProfileInfo: React.FC<PropsType> = React.memo(({currentProfile, status, updateMyStatus, isShowMyProfile, handlePhotoChange,sendProfileDataOnServ }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const imgRef = createRef<HTMLImageElement>()

    const OnPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) handlePhotoChange(e.target.files[0])
    }

    const openDialog = () =>{
        dispatch(startDialogWithFriend(currentProfile.userId))
        let path = `/dialogs/${currentProfile.userId}`
        navigate(path)
    }

    let [editMode, changeEditMode] = useState(false)
    let [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])


    const getMainColors = () => {
        changeAvaBorderColors(getTwoMainColors(imgRef.current))
    }

    return (
        <div style={{width: '300px'}}>
            <div className="profile__info-main">
                <div className="ava-border">
                    <AvatarBorderFinal colors={colors}/>
                </div>
                {svgList.map(item => <AvatarEffect key={item} id={item} colors={colors}/>
                )}
                <div className="profile__info-main-avatar">
                    {currentProfile.photos.large ? <img
                        src={ProxyImageUrl(currentProfile.photos.large)}
                        ref={imgRef}
                        onLoad={getMainColors}
                        crossOrigin="anonymous"
                        alt="user"/>
                        : <UserDefaultPhoto/>}
                </div>
                <div className="profile__info-main-name">
                    Sophie Fortune
                </div>
                <div className="profile__info-main-social">
                    @batm1x
                </div>
                <div style={{width:'100px',height:'100px',background:colors[0]}}></div>
                <div style={{width:'100px',height:'100px',background:colors[1]}}></div>
            </div>
            <div>
              {!isShowMyProfile && <button onClick={openDialog}>Send message</button>}
            </div>
            <div>
                {isShowMyProfile && <input type={"file"} onChange={OnPhotoSelected}/>}
            </div>
                <ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>
            {!editMode && <ProfileData currentProfile={currentProfile}/>}
           {/* {editMode && <ProfileDataInput currentProfile={currentProfile} sendProfileDataOnServ={sendProfileDataOnServ} changeEditMode={changeEditMode}/>}*/}
            {isShowMyProfile && <button onClick={(e) => {changeEditMode(true)}}>Edit</button>}
        </div>
    )


})


export default ProfileInfo