import React, {createRef, useEffect, useRef, useState} from "react"
import { FormOutlined} from "@ant-design/icons";
// @ts-ignore
import UserDefaultPhoto from 'assets/images/UserDefaultPhoto'
import {actions, getUserStatusInProfile, handlePhotoChange, updateMyStatus} from "redux/profileReducer";
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
import {getCurrentProfile, getMainColors, getStatus} from "redux/profile-selectors";
import Preloader from "common/Preloader/Preloader";
import HeaderAvatar from "components/HeaderAvatar";
import MainAvatar from "components/MainAvatar";
import TopWriter from "components/Sidebars/RightSidebar/TopWriter";
import {postsAPI} from "api/postsAPI";
import ProfileStatus from "components/Sidebars/RightSidebar/ProfileStatus";
import ProfileDataInput from "./ProfileDataInput";
import ProfileContactsInput from "components/ProfileContactsInput";
import SocialMediaContact from "components/SocialMediaContact";


export type TopUserType = {
    id: string
    fullName: string
    avatarUrl:string
    viewsCount: number
}
const ProfileInfo = React.memo(() => {

    let [editMode, changeEditMode] = useState(false)
    let [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])
    const [toggle, setToggle] = useState(false)
    const [topUsers, setTopUsers] = useState<TopUserType[]>([])
    const dispatch = useAppDispatch()
   // const navigate = useNavigate()
    const authID = useSelector(getAuthID)
    const currentProfile = useSelector(getCurrentProfile)
    const status = useSelector(getStatus)
    const inputImgRef = useRef<HTMLInputElement>(null)


    const OnPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) {
            dispatch(handlePhotoChange(e.target.files[0]))
            dispatch(handlingChangeAvatar(e.target.files[0]))
            dispatch(handlingAuthDataBlog())
        }
    }
    const getTopWriters = async () => {
        const response = await postsAPI.getTopWriters()
        if(response.resultCode === 0) {
            setTopUsers(response.data.top)
        } else {
            console.log('не удалось загрузить авторов')
        }
    }
    const updateStatus = (status:string) => {
        dispatch(updateMyStatus(status))
    }
    useEffect(() => {
        if(currentProfile){
            dispatch(getUserStatusInProfile(currentProfile.userId))
        }
        getTopWriters()
    }, [])

    useEffect(() => {
        if(currentProfile?.userId === authID) {
            dispatch(actions.setMainColors(colors))
        }
    },[colors])


  /*  const openDialog = () =>{
        dispatch(startDialogWithFriend(currentProfile.userId))
        /!*let path = `/dialogs/${currentProfile.userId}`
        navigate(path)*!/
    }*/

    if(!currentProfile) return <Preloader/>

    return (
        <div className='profile__info'>
            <div className="profile__info-menu">
                <Bell/>
                <Chat/>
                <Mail/>
                <Setting/>
            </div>
            <div className="profile__info-main">
                <div
                    className="ava-border"
                    onClick={() => inputImgRef.current?.click()}
                    style={{cursor: authID === currentProfile.userId ? 'pointer':'inherit'}}
                >
                    <AvatarBorderFinal colors={colors} toggle={toggle} setToggle={setToggle}/>
                </div>
                    <ContainerAvatarEffect colors={colors} toggle={toggle}/>
                <MainAvatar
                    photos={currentProfile.photos}
                    changeAvaBorderColors={changeAvaBorderColors}
                />
                {authID === currentProfile.userId
                    &&
                    <input
                    type={"file"}
                    onChange={OnPhotoSelected}
                    ref={inputImgRef}
                    hidden
                />}
                <div  className="profile__info-main-name">
                    Sophie Fortune
                </div>
                <div className="profile__info-main-social">
                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>
            </div>
            <div className="profile__info-members">
                <div className="new-members">
                    <span>Top viewed</span>
                </div>
                <div className="members__list">
                    {topUsers?.map((user) => <TopWriter user={user}/>)}
                </div>
            </div>
            <div className="profile__info-social">
                <div className="follow">
                    <span>
                        Follow me
                    </span>
                    <span onClick={() => changeEditMode(true)}>
                        <FormOutlined/>
                    </span>
                </div>
                {!editMode
                    ?
                    <>
                        {Object.keys(currentProfile.contacts).map(key =>
                            <SocialMediaContact key={key}
                                                socialMedia={key}
                                                contactValue={currentProfile.contacts[key as any]}
                        />)}
                    </>
                    :
                    <ProfileContactsInput
                        currentProfile={currentProfile}
                        changeEditMode={changeEditMode}
                    />}
            </div>

            {/*{!isShowMyProfile && <button onClick={openDialog}>Send message</button>}*/}

            {/*{!editMode && <ProfileData currentProfile={currentProfile}/>}*/}
           {/* {editMode && <ProfileDataInput currentProfile={currentProfile} sendProfileDataOnServ={sendProfileDataOnServ} changeEditMode={changeEditMode}/>}*/}
            {/*{isShowMyProfile && <button onClick={(e) => {changeEditMode(true)}}>Edit</button>}*/}
        </div>
    )


})


export default ProfileInfo