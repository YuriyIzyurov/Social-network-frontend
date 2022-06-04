import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {
    getProfileID,
    getUserStatusInProfile,
    setProfileOnPage, updateMyStatus,
} from "../../../redux/profileReducer";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";
import {getCurrentProfile, getId, getStatus} from "../../../redux/profile-selectors";
import {getAuth} from "../../../redux/auth-selectors";



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
        return <Profile {...this.props} updateMyStatus={this.props.updateMyStatus}/>
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
    connect(mapStateToProps, {getProfileID, setProfileOnPage,getUserStatusInProfile,updateMyStatus}),
    withRouter
)(ProfileContainer)





