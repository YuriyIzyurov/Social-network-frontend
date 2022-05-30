import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileID, setProfileOnPage} from "../../../redux/profileReducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {withRouter} from "../../HOC/withRouter";



class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setProfileOnPage(this.props.router.params.id)
    }

    render() {
        return <Profile {...this.props} />
    }
}

let mapStateToProps = (state) => {
    return {
        currentProfile: state.profile.currentProfile
    }
}


export default compose(
    connect(mapStateToProps, {getProfileID, setProfileOnPage}),
    withRouter,
    withRedirectIfNoAuth
)(ProfileContainer)





