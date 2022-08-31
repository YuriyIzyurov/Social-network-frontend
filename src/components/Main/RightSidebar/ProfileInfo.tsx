import React, {useEffect, useState} from "react"
import './ProfileInfo.scss'
import {FormOutlined} from "@ant-design/icons";
import {actions, getUserStatusInProfile} from "redux/profileReducer";
import {actions as appActions} from "redux/appReducer";
import {useAppDispatch} from "redux/reduxStore";
// @ts-ignore
import {Bell, Chat, Mail, Setting} from "assets/images/VectorComponents/TopIcons"
import {useSelector} from "react-redux";
import {getAuthID} from "redux/auth-selectors";
import {getCurrentProfile} from "redux/profile-selectors";
import Preloader from "components/Preloader/Preloader";
import {AuthData, ProfileInfoMain, TopWriter} from "./../index";
import {postsAPI} from "api/postsAPI";
import ProfileContactsInput from "components/ProfileContactsInput";
import SocialMediaContact from "components/SocialMediaContact";
import {TopUserType} from "typings/types";
import { Button } from 'antd';
import {useNavigate} from "react-router";
import {getRedirectLoginStatus} from "redux/app-selector";
import {GlowingEnterButton} from "components/CustomButtons/GlowingEnterButton";


const ProfileInfo = React.memo(() => {

    //todo: переделать в useReducer
    const [editMode, changeEditMode] = useState(false)
    const [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])

    const [topUsers, setTopUsers] = useState<TopUserType[]>([])

    const authID = useSelector(getAuthID)
    const currentProfile = useSelector(getCurrentProfile)
    const isRedirect = useSelector(getRedirectLoginStatus)

    const dispatch = useAppDispatch()

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


    const getTopWriters = async () => {
        const response = await postsAPI.getTopWriters()
        if(response.resultCode === 0) {
            setTopUsers(response.data.top)
        } else {
            console.log('не удалось загрузить авторов')
        }
    }
    const redirectHandler = () => {
        dispatch(appActions.setRedirectToLogin(true))
    }

    return (
        <div className='profile__info'>
            <div style={{cursor: authID ? "default" : 'not-allowed'}} className="profile__info-menu">
                <Bell/>
                <Chat/>
                <Mail/>
                <Setting/>
            </div>
            {authID && currentProfile
                ?
                <ProfileInfoMain
                    currentProfile={currentProfile}
                    authID={authID}
                    colors={colors}
                    changeAvaBorderColors={changeAvaBorderColors}
                />
                :
                <div className="profile__info-login">
                    <span>
                        Authorization
                    </span>
                    {isRedirect
                        ?
                        <AuthData/>
                        :
                        <div className="profile__info-login-authInfo">
                            <GlowingEnterButton sizeX={35} onClick={redirectHandler}/>
                        </div>
                    }
                </div>
            }
            <div className="profile__info-members">
                <div className="new-members">
                    <span>Top viewed</span>
                </div>
                <div className="members__list">
                    {topUsers?.map((user) => <TopWriter key={user.id} user={user}/>)}
                </div>
            </div>
            {currentProfile &&
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
                                if (key === 'vk' || key === 'instagram' || key === 'github') {
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
                </div>}
        </div>
    )


})

export default ProfileInfo