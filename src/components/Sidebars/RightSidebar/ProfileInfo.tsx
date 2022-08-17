import React, {createRef, useState} from "react"
// @ts-ignore
import UserDefaultPhoto from 'assets/images/UserDefaultPhoto'
import {handlePhotoChange} from "redux/profileReducer";
import {useAppDispatch} from "redux/reduxStore";
import {startDialogWithFriend} from "redux/dialogReducer";
// @ts-ignore
import AvatarBorderFinal from "assets/images/Web App UI Design/AvatarBorderFinal"
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL"
import {getTwoMainColors} from "utils/Color/MainColorsThief"
import {ContainerAvatarEffect} from "assets/images/Web App UI Design/ContainerAvatarEffect";
import instagram from "assets/images/instagram.png"
// @ts-ignore
import {Bell, Chat, Mail, Setting} from "assets/images/TopAction/TopIcons"
import {handlingAuthDataBlog, handlingChangeAvatar} from "redux/authBlogReducer";
import {useSelector} from "react-redux";
import {getAuthID} from "redux/auth-selectors";
import {getCurrentProfile} from "redux/profile-selectors";
import Preloader from "common/Preloader/Preloader";


const ProfileInfo = React.memo(() => {

    let [editMode, changeEditMode] = useState(false)
    let [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])
    const [toggle, setToggle] = useState(false)
    const dispatch = useAppDispatch()
   // const navigate = useNavigate()
    const imgRef = createRef<HTMLImageElement>()
    const authID = useSelector(getAuthID)
    const currentProfile = useSelector(getCurrentProfile)


    const OnPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) {
            dispatch(handlePhotoChange(e.target.files[0]))
            dispatch(handlingChangeAvatar(e.target.files[0]))
            dispatch(handlingAuthDataBlog())
        }
    }

    if(!currentProfile) return <Preloader/>
    const openDialog = () =>{
        dispatch(startDialogWithFriend(currentProfile.userId))
        /*let path = `/dialogs/${currentProfile.userId}`
        navigate(path)*/
    }



    const getMainColors = () => {
        changeAvaBorderColors(getTwoMainColors(imgRef.current))
    }

    return (
        <div className='profile__info'>
            <div className="profile__info-menu">
                <Bell/>
                <Chat/>
                <Mail/>
                <Setting/>
            </div>
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
                    <div className="social__media-background">
                        <img src={instagram} alt='insta'/>
                    </div>
                    <div className="social__media-link">
                        @izyurovy
                    </div>
                </div>
            </div>
            {authID === currentProfile.userId && <input type={"file"} onChange={OnPhotoSelected}/>}
            {/*{!isShowMyProfile && <button onClick={openDialog}>Send message</button>}*/}
                {/*<ProfileStatus status={status} updateMyStatus={updateMyStatus}/>*/}
            {/*{!editMode && <ProfileData currentProfile={currentProfile}/>}*/}
           {/* {editMode && <ProfileDataInput currentProfile={currentProfile} sendProfileDataOnServ={sendProfileDataOnServ} changeEditMode={changeEditMode}/>}*/}
            {/*{isShowMyProfile && <button onClick={(e) => {changeEditMode(true)}}>Edit</button>}*/}
        </div>
    )


})


export default ProfileInfo