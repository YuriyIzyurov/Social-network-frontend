import React, {useEffect, useState} from "react"
import './ProfileInfo.scss'
import {FormOutlined} from "@ant-design/icons";
import {getUserStatusInProfile} from "redux/Reducers";
import {useAppDispatch} from "redux/reduxStore";
import {Bell, Chat, Mail, Setting} from "assets/VectorComponents"
import {useSelector} from "react-redux";
import {getCurrentProfile, getEditMode, getRedirectLoginStatus,getNumberOfNewMessages,getAuthID} from "redux/Selectors";
import {AuthData, ProfileInfoMain, TopWriter} from "./../index";
import {postsAPI} from "api/postsAPI";
import {ProfileContactsInput} from "components/Forms";
import {SocialMediaContact} from "components/Main";
import {TopUserType} from "typings";
import {GlowingEnterButton} from "components/CustomButtons/GlowingEnterButton";
import {dialogsAPI} from "api/dialogsAPI";
import {appActions, dialogActions, profileActions} from "redux/Actions";


const ProfileInfo = React.memo(() => {

    //todo: переделать в useReducer

    const [colors, changeAvaBorderColors] = useState(["#A73EE7","#00EBFF"])
    const [isFollowBlockVisible, setFollowBlockVisible] = useState(false)
    const [topUsers, setTopUsers] = useState<TopUserType[]>([])

    const authID = useSelector(getAuthID)
    const currentProfile = useSelector(getCurrentProfile)
    const isRedirect = useSelector(getRedirectLoginStatus)
    const editMode = useSelector(getEditMode)
    const count = useSelector(getNumberOfNewMessages)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(currentProfile){
            dispatch(getUserStatusInProfile(currentProfile.userId))
            console.log(currentProfile.contacts)
        }
        getTopWriters()
    }, [])

    useEffect(() => {
        if(currentProfile?.userId === authID) {
            dispatch(profileActions.setMainColors(colors))
        }
    },[colors])

    useEffect(() => {
        getNewMessages()
        getFollowBlockStatus()
    }, [currentProfile])

    const getNewMessages = async () => {
        const response =  await dialogsAPI.getNewMessages()
        dispatch(dialogActions.setNumberOfNewMessages(response))
    }

    const getTopWriters = async () => {
        const response = await postsAPI.getTopWriters()
        if(response.resultCode === 0) {
            console.log(response.data.top)
            setTopUsers(response.data.top)
        } else {
            console.log('не удалось загрузить авторов')
        }
    }
    const redirectHandler = async (destination: string) => {
        if(destination === 'login') {
            dispatch(appActions.setRedirectToLogin(true))
            return
        }
        if(destination === 'dialogs') {
            dispatch(dialogActions.setRedirectToDialogPage(true))
            return
        }
    }
    const changeEditMode = (status:boolean) => {
        dispatch(profileActions.setEditMode(status))
    }

    const getFollowBlockStatus= () => {
        if(currentProfile){
            Object.keys(currentProfile.contacts).find(key => {
                if (key === 'vk' || key === 'instagram' || key === 'github') {
                    if(currentProfile.contacts[key as any]){
                        setFollowBlockVisible(true)
                        return true
                    }
                }
                setFollowBlockVisible(false)
                return false
            })
        }
    }
    return (
        <div className='profile__info'>
            <div style={{cursor: authID ? "default" : 'not-allowed'}} className="profile__info-menu">
                <Bell onClick={redirectHandler} count={count}/>
                <Chat onClick={redirectHandler}/>
                <Mail onClick={changeEditMode}/>
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
                        Авторизация
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
                    <span>Топ авторов</span>
                </div>
                <div className="members__list">
                    {topUsers?.map((user, index) => <TopWriter key={user.id} user={user} index={index + 1}/>)}
                </div>
            </div>
            {currentProfile &&
                <div className="profile__info-social">
                    {isFollowBlockVisible
                        &&
                        <div className="follow">
                            <span>
                                Контакты
                            </span>
                            {currentProfile.userId === authID &&
                            <span onClick={() => changeEditMode(true)}>
                                <FormOutlined/>
                             </span>
                        }
                    </div>}
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