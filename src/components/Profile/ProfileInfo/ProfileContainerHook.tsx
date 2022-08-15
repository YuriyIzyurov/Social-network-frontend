import React, {ComponentType, memo, useEffect, useMemo, useState} from "react";
import Profile from "../Profile";
import {connect, useSelector} from "react-redux";
import {
    actions,
    getUserStatusInProfile, handlePhotoChange, sendProfileDataOnServ, setProfileOnPage, ThunkType, updateMyStatus,
} from "../../../redux/profileReducer";
import {compose} from "redux";
import {getCurrentProfile, getId, getStatus} from "../../../redux/profile-selectors";
import {getAuth} from "../../../redux/auth-selectors";
import {Navigate} from "react-router";
import {CurrentProfileType} from "../../../typings/types";
import {AppStateType} from "../../../redux/reduxStore";
import {getUsers} from "../../../redux/user-selectors";




type StatePropsProfileType = ReturnType<typeof mapStateToProps>
//todo:почему диспатч не передается в коннект 2ым параметром?
type DispatchPropsProfileType = {
    setProfileOnPage: (idFromURL: number) => ThunkType
    getUserStatusInProfile: (idFromURL: number) => ThunkType
    updateMyStatus: () => ThunkType
    handlePhotoChange: (image: File) => ThunkType
    sendProfileDataOnServ:(newData:CurrentProfileType) => any
}
//todo: change type
type OwnPropsType = {
    router: any
}
type OwnStateType = {
    isShowMyProfile: boolean
}
type PropsType = StatePropsProfileType & DispatchPropsProfileType & OwnPropsType

const ProfileContainerHook: React.FC<PropsType> = memo(({ setProfileOnPage, isAuth, getUserStatusInProfile,  loggedUser,  handlePhotoChange, sendProfileDataOnServ, currentProfile}) => {


    return <Profile />
})

let mapStateToProps = (state: AppStateType)  => {

    return {
        currentProfile: getCurrentProfile(state),
        loggedUser: getId(state),
        isAuth: getAuth(state)
    }
}


export default compose<ComponentType>(
    connect<StatePropsProfileType, {}, OwnPropsType, AppStateType>(mapStateToProps, { setProfileOnPage,getUserStatusInProfile,updateMyStatus, handlePhotoChange, sendProfileDataOnServ}),
)(ProfileContainerHook)





