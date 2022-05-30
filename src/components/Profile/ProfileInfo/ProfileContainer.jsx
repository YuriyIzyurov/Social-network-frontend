import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileID, setProfileOnPage} from "../../../redux/profileReducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router";
import {withRedirectIfNoAuth} from "../../HOC/withRedirectIfNoAuth";
import {compose} from "redux";



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
function withRouter(ProfileContainer){
    function ComponentWithRouterProp(props){
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <ProfileContainer
                {...props}
                router={{location, navigate, params}} />
        )
    }
    return ComponentWithRouterProp
}


export default compose(
    connect(mapStateToProps, {getProfileID, setProfileOnPage}),
    withRouter,
    withRedirectIfNoAuth
)(ProfileContainer)





