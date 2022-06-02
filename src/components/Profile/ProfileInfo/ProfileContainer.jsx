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



class ProfileContainer extends React.Component {

    componentDidMount() {
        let idFromURL = this.props.router.params.id
        if(!idFromURL){
            idFromURL = this.props.loggedUser
            if(!idFromURL) {
                this.props.history.push("/login")
            }
        }
        this.props.setProfileOnPage(idFromURL)
        this.props.getUserStatusInProfile(idFromURL)
    }



    render() {
        return <Profile {...this.props} updateMyStatus={this.props.updateMyStatus}/>
    }
}

let mapStateToProps = (state) => {
    return {
        currentProfile: getCurrentProfile(state),
        status: getStatus(state),
        loggedUser: getId(state)
    }
}


export default compose(
    connect(mapStateToProps, {getProfileID, setProfileOnPage,getUserStatusInProfile,updateMyStatus}),
    withRouter
)(ProfileContainer)





