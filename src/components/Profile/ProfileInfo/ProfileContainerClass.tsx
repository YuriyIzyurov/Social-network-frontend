import React, {ComponentType, useEffect, useState} from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {
    actions,
    ActionType,
    getUserStatusInProfile, handlePhotoChange, sendProfileDataOnServ,
    setProfileOnPage, ThunkType, updateMyStatus,
} from "../../../redux/profileReducer";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
import {getCurrentProfile, getId, getStatus} from "../../../redux/profile-selectors";
import {getAuth} from "../../../redux/auth-selectors";
import {Navigate} from "react-router";
import {CurrentProfileType} from "../../../typings/types";
import {AppStateType} from "../../../redux/reduxStore";



type StatePropsProfileType = {
    currentProfile: CurrentProfileType
    loggedUser: number
    isAuth: boolean
    status:string
}
type DispatchPropsProfileType = {
    getProfileID: (id: number) => (ActionType)
    setProfileOnPage: (idFromURL: number) => ThunkType
    getUserStatusInProfile: (idFromURL: number) => ThunkType
    updateMyStatus: () => void
    handlePhotoChange: (image: File) => ThunkType
    sendProfileDataOnServ:(newData:CurrentProfileType) => void
}
//todo: change type
type OwnPropsType = {
    router: any
}
type OwnStateType = {
    isShowMyProfile: boolean
}
type PropsType = StatePropsProfileType & DispatchPropsProfileType & OwnPropsType

class ProfileContainerClass extends React.Component<StatePropsProfileType & DispatchPropsProfileType & OwnPropsType, OwnStateType> {
    constructor(props: (StatePropsProfileType & DispatchPropsProfileType & OwnPropsType)) {
        super( props );
        this.state = {
            isShowMyProfile: false
        }
    }
    componentDidMount() {
        let idFromURL = this.props.router.params.id
        if(idFromURL){
            this.props.setProfileOnPage(idFromURL)
            this.props.getUserStatusInProfile(idFromURL)
        }
        else {
            if(this.props.isAuth) {
                this.props.setProfileOnPage(this.props.loggedUser)
                this.props.getUserStatusInProfile(this.props.loggedUser)
            }
        }
    }
    componentDidUpdate(prevProps:PropsType, prevState:OwnStateType) {
        let idFromURL = this.props.router.params.id;
        let loggedUser = this.props.loggedUser;
        let isShowMyProfile = this.state.isShowMyProfile;
        if (!isShowMyProfile) {

            if (+idFromURL === loggedUser) {
                this.setState( {isShowMyProfile: true} )
            }
            if (!idFromURL && this.props.isAuth) {
                this.props.setProfileOnPage( loggedUser );
                this.props.getUserStatusInProfile( loggedUser );
                this.setState( {isShowMyProfile: true} )
            }
        }
    }


    render() {
        if (!this.props.isAuth && !this.props.router.params.id) {
            return <Navigate to={'/login'} />
        }
        return <Profile {...this.props} isShowMyProfile={this.state.isShowMyProfile}
                        updateMyStatus={this.props.updateMyStatus}
                        handlePhotoChange={this.props.handlePhotoChange}
                        sendProfileDataOnServ={this.props.sendProfileDataOnServ}/>
    }
}

let mapStateToProps = (state: AppStateType)  => {
    return {
        currentProfile: getCurrentProfile(state),
        status: getStatus(state),
        loggedUser: getId(state),
        isAuth: getAuth(state)
    }
}

let getProfileID = actions.getProfileID
export default compose<ComponentType>(
    connect(mapStateToProps, {getProfileID, setProfileOnPage,getUserStatusInProfile,updateMyStatus, handlePhotoChange, sendProfileDataOnServ}),
    withRouter
)(ProfileContainerClass)

