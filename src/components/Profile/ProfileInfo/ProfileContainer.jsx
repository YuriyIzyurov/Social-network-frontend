import React from "react";
import Profile from "../Profile";
import {connect} from "react-redux";
import {getProfileID, setProfileOnPage} from "../../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router";


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
export default connect(mapStateToProps, {getProfileID, setProfileOnPage})(withRouter(ProfileContainer))



