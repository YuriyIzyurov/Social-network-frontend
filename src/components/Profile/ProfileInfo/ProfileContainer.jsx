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



class ProfileContainer extends React.Component {

    componentDidMount() {
        let idFromURL = this.props.router.params.id
        if(!idFromURL){
            idFromURL = 24174
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
        currentProfile: state.profile.currentProfile,
        status: state.profile.status
    }
}


export default compose(
    connect(mapStateToProps, {getProfileID, setProfileOnPage,getUserStatusInProfile,updateMyStatus}),
    withRouter
)(ProfileContainer)





