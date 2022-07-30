import React, {createRef, useRef, useState} from "react"
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
import {ContainerAvatarEffect} from "../../../assets/images/Web App UI Design/ContainerAvatarEffect";
import useHover from "../../HOOK/useHover";
import { InstagramOutlined } from '@ant-design/icons';


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
    const [toggle, setToggle] = useState(false)

    const getMainColors = () => {
        changeAvaBorderColors(getTwoMainColors(imgRef.current))
    }

    return (
        <>
            <div className="profile__info-main">
                <div className="ava-border">
                    <AvatarBorderFinal colors={colors} toggle={toggle} setToggle={setToggle}/>
                </div>
                    <ContainerAvatarEffect colors={colors} toggle={toggle}/>
                <div className="profile__info-main-avatar" >
                    {currentProfile.photos.large ? <img
                        src={ProxyImageUrl(currentProfile.photos.large)}
                        ref={imgRef}
                        onLoad={getMainColors}
                        crossOrigin="anonymous"
                        alt="user"/>
                        : <UserDefaultPhoto/>}
                </div>
                <div  className="profile__info-main-name">
                    Sophie Fortune
                </div>
                <div className="profile__info-main-social">
                    @batm1x
                </div>
            </div>
            <div className="profile__info-members">
                <div className="new-members">
                    <span>New Members</span>
                    <span>See all</span>
                </div>
                <div className="members__list">
                    <div className="members__list-item">
                        <div className="members__list-item-avatar">
                            <img style={{width:"44px", height:"44px"}} src={currentProfile.photos.small} alt='ava'/>
                        </div>
                        <div className="members__list-item-name">
                            <span>Anne Couture</span>
                            <span>5 min ago</span>
                        </div>
                    </div>
                    <div className="members__list-item">
                        <div className="members__list-item-avatar">
                            <img style={{width:"44px", height:"44px"}} src={currentProfile.photos.small} alt='ava'/>
                        </div>
                        <div className="members__list-item-name">
                            <span>John Paddington</span>
                            <span>5 hours ago</span>
                        </div>
                    </div>
                    <div className="members__list-item">
                        <div className="members__list-item-avatar">
                            <img style={{width:"44px", height:"44px"}} src={currentProfile.photos.small} alt='ava'/>
                        </div>
                        <div className="members__list-item-name">
                            <span>Michael Siguirdney</span>
                            <span>22 min ago</span>
                        </div>
                    </div>
                    <div className="members__list-item">
                        <div className="members__list-item-avatar">
                            <img style={{width:"44px", height:"44px"}} src={currentProfile.photos.small} alt='ava'/>
                        </div>
                        <div className="members__list-item-name">
                            <span>Ivan Nalimov</span>
                            <span>2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile__info-social">
                <div className="follow">Follow me</div>
                <div className="social__media">
                    <div className="social__media-icon">
                        <InstagramOutlined />
                    </div>
                    <div className="social__media-link">
                        @izyurovy
                    </div>
                </div>
            </div>
            {/*{isShowMyProfile && <input type={"file"} onChange={OnPhotoSelected}/>}*/}
            {/*{!isShowMyProfile && <button onClick={openDialog}>Send message</button>}*/}
                {/*<ProfileStatusWithHooks status={status} updateMyStatus={updateMyStatus}/>*/}
            {/*{!editMode && <ProfileData currentProfile={currentProfile}/>}*/}
           {/* {editMode && <ProfileDataInput currentProfile={currentProfile} sendProfileDataOnServ={sendProfileDataOnServ} changeEditMode={changeEditMode}/>}*/}
            {/*{isShowMyProfile && <button onClick={(e) => {changeEditMode(true)}}>Edit</button>}*/}
        </>
    )


})


export default ProfileInfo