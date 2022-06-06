import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {
    getProfileID,
    getUserStatusInProfile, handlePhotoChange, sendProfileDataOnServ,
    setProfileOnPage, updateMyStatus,
} from "../../../redux/profileReducer";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
import {getCurrentProfile, getId, getStatus} from "../../../redux/profile-selectors";
import {getAuth} from "../../../redux/auth-selectors";
import {Navigate} from "react-router";



class ProfileContainer extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
            isShowMyProfile: true
        }
    }
    componentDidMount() {

        let idFromURL = this.props.router.params.id
        let loggedUser = this.props.loggedUser
        if(idFromURL){
            this.props.setProfileOnPage(idFromURL)
            this.props.getUserStatusInProfile(idFromURL)
            } else {
                if(this.props.isAuth) {
                    this.props.setProfileOnPage(loggedUser)
                    this.props.getUserStatusInProfile(loggedUser)
                }
         }
        }
    componentDidUpdate(prevProps, prevState, snapshot) {

        let idFromURL = this.props.router.params.id;
        let loggedUser = this.props.loggedUser;
        let isShowMyProfile = this.state.isShowMyProfile;
        if (isShowMyProfile) {
            if (idFromURL === loggedUser) {
                this.setState( {isShowMyProfile: false} )
            }
            if (!idFromURL && this.props.isAuth) {
                this.props.setProfileOnPage( loggedUser );
                this.props.getUserStatusInProfile( loggedUser );
                this.setState( {isShowMyProfile: false} )
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

let mapStateToProps = (state) => {
    return {
        currentProfile: getCurrentProfile(state),
        status: getStatus(state),
        loggedUser: getId(state),
        isAuth: getAuth(state)
    }
}


export default compose(
    connect(mapStateToProps, {getProfileID, setProfileOnPage,getUserStatusInProfile,updateMyStatus, handlePhotoChange, sendProfileDataOnServ}),
    withRouter
)(ProfileContainer)





