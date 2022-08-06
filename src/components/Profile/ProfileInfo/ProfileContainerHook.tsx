import React, {ComponentType, useEffect, useState} from "react";
import Profile from "../Profile";
import {connect, useSelector} from "react-redux";
import {
    actions,
    getUserStatusInProfile, handlePhotoChange, sendProfileDataOnServ, setProfileOnPage, ThunkType, updateMyStatus,
} from "../../../redux/profileReducer";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
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

const ProfileContainerHook: React.FC<PropsType> = ({ setProfileOnPage, isAuth, getUserStatusInProfile, router, loggedUser, updateMyStatus, handlePhotoChange, sendProfileDataOnServ, status, currentProfile}) => {

    let [isShowMyProfile, setMyProfile ] = useState(false)

    useEffect(() => {

        if(router.location.pathname === '/') {
            if(loggedUser) {
                setProfileOnPage(loggedUser)
                getUserStatusInProfile(loggedUser)
                return
            }
        }
        const letters = router.location.pathname.match(/[a-z]/g).join('')
        if(letters !== 'profile') {
            return
        }
        let idFromURL = router.location.pathname.replace(/\D/g,'')
        if(idFromURL){
            setMyProfile(false)
          setProfileOnPage(idFromURL)
          getUserStatusInProfile(idFromURL)
        } else {
            if(loggedUser) {
                setProfileOnPage(loggedUser)
                getUserStatusInProfile(loggedUser)
            }
        }
        if (!isShowMyProfile) {
            if (isAuth && +idFromURL === loggedUser) {
                setMyProfile(true)
            }
            if (isAuth && !idFromURL && loggedUser) {
                setMyProfile(true)
            }
        }
    }, [router.location.pathname])



    if (!isAuth && !router.location.pathname) return <Navigate to={'/login'} />

    return <Profile isShowMyProfile={isShowMyProfile}
                    updateMyStatus={updateMyStatus}
                    handlePhotoChange={handlePhotoChange}
                    sendProfileDataOnServ={sendProfileDataOnServ}
                    currentProfile={currentProfile}
                    status={status}
                   />


}

let mapStateToProps = (state: AppStateType)  => {
    return {
        currentProfile: getCurrentProfile(state),
        status: getStatus(state),
        loggedUser: getId(state),
        users: getUsers(state),
        isAuth: getAuth(state)
    }
}


export default compose<ComponentType>(
    connect<StatePropsProfileType, {}, OwnPropsType, AppStateType>(mapStateToProps, { setProfileOnPage,getUserStatusInProfile,updateMyStatus, handlePhotoChange, sendProfileDataOnServ}),
    withRouter
)(ProfileContainerHook)





