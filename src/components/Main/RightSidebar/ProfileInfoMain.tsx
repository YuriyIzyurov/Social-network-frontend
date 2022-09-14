import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {AvatarBorderFinal, ContainerAvatarEffect} from "assets/VectorComponents";
import {MainAvatar} from "components/CustomAvatars";
import {ProfileStatus} from "components/Main/RightSidebar/ProfileStatus";
import {useSelector} from "react-redux";
import {getStatus} from "redux/Selectors";
import { handlePhotoChange, updateMyStatus, handlingChangeAvatar, handlingAuthDataBlog,  startDialogWithFriend} from 'redux/Reducers';
import {useAppDispatch} from "redux/reduxStore";
import {CurrentProfileType} from "typings";
import {dialogActions, profileActions} from "redux/Actions";

type PropsType = {
    currentProfile: CurrentProfileType
    authID: number | null
    colors: string[]
    changeAvaBorderColors: Dispatch<SetStateAction<string[]>>
}

export const ProfileInfoMain:React.FC<PropsType> = ({currentProfile, authID, colors, changeAvaBorderColors }) => {

    const status = useSelector(getStatus)
    const inputImgRef = useRef<HTMLInputElement>(null)
    const [toggle, setToggle] = useState(false)
    const dispatch = useAppDispatch()

    const OnPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.files) {
            dispatch(handlePhotoChange(e.target.files[0]))
            dispatch(handlingChangeAvatar(e.target.files[0]))
            dispatch(handlingAuthDataBlog())
        }
    }
    const openDialog = () =>{
        if(currentProfile){
            dispatch(startDialogWithFriend(currentProfile.userId))
            dispatch(profileActions.setRedirect(currentProfile.userId))
            dispatch(dialogActions.setDialogID(currentProfile.userId))
        }
    }
    const updateStatus = (status:string) => {
        dispatch(updateMyStatus(status))
    }

    return (
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
    );
};
