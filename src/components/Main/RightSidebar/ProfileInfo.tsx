import React, {useEffect, useRef, useState} from "react"
import './ProfileInfo.scss'
import {FormOutlined} from "@ant-design/icons";
import {actions, getUserStatusInProfile, handlePhotoChange, updateMyStatus} from "redux/profileReducer";
import {actions as dialogActions, startDialogWithFriend} from "redux/dialogReducer";
import {useAppDispatch} from "redux/reduxStore";
// @ts-ignore
import {Bell, Chat, Mail, Setting} from "assets/images/VectorComponents/TopIcons"
import {handlingAuthDataBlog, handlingChangeAvatar} from "redux/authBlogReducer";
import {useSelector} from "react-redux";
import {getAuthID} from "redux/auth-selectors";
import {getCurrentProfile, getStatus} from "redux/profile-selectors";
import Preloader from "components/Preloader/Preloader";
import MainAvatar from "components/MainAvatar";
import {TopWriter, ProfileStatus} from "./../index";
import {postsAPI} from "api/postsAPI";
import ProfileContactsInput from "components/ProfileContactsInput";
import SocialMediaContact from "components/SocialMediaContact";
import { AvatarBorderFinal, ContainerAvatarEffect } from "assets/images";
import { TopUserType } from "typings/types";



const ProfileInfo = React.memo(() => {

    //todo: переделать в useReducer
    const [editMode, changeEditMode] = useState(false)
    const [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])
    const [toggle, setToggle] = useState(false)
    const [topUsers, setTopUsers] = useState<TopUserType[]>([])

    const authID = useSelector(getAuthID)
    const currentProfile = useSelector(getCurrentProfile)
    const status = useSelector(getStatus)

    const dispatch = useAppDispatch()
    const inputImgRef = useRef<HTMLInputElement>(null)

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

    const openDialog = () =>{
        if(currentProfile){
            dispatch(startDialogWithFriend(currentProfile.userId))
            dispatch(actions.setRedirect(currentProfile.userId))
            dispatch(dialogActions.setDialogID(currentProfile.userId))
        }
    }

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
                    {currentProfile.fullName}
                </div>
                <div className="profile__info-main-social">
                    <ProfileStatus
                        status={status}
                        updateStatus={updateStatus}
                        currentProfile={currentProfile.userId}
                        authID={authID}
                    />
                </div>
                {authID !== currentProfile.userId
                    ?
                    <div onClick={openDialog} className="profile__info-main-sendMessage">
                        <span>
                            Написать сообщение
                        </span>
                    </div>
                    :
                    <div style={{height:'24px'}}>
                    </div>
                }
            </div>
            <div className="profile__info-members">
                <div className="new-members">
                    <span>Top viewed</span>
                </div>
                <div className="members__list">
                    {topUsers?.map((user) => <TopWriter key={user.id} user={user}/>)}
                </div>
            </div>
            <div className="profile__info-social">
                <div className="follow">
                    <span>
                        Follow me
                    </span>
                    {currentProfile.userId === authID &&
                        <span onClick={() => changeEditMode(true)}>
                             <FormOutlined/>
                        </span>
                    }
                </div>
                {!editMode
                    ?
                    <>
                        {Object.keys(currentProfile.contacts).map(key => {
                            if(key === 'vk'||key ==='instagram'||key ==='github') {
                                return <SocialMediaContact key={key}
                                                           socialMedia={key}
                                                           contactValue={currentProfile.contacts[key as any]}
                                />
                            }
                        })}
                    </>
                    :
                    <ProfileContactsInput
                        currentProfile={currentProfile}
                        changeEditMode={changeEditMode}
                    />}
            </div>
        </div>
    )


})

export default ProfileInfo