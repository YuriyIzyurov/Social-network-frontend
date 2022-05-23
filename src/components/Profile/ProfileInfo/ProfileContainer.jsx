import React from "react";
import Profile from "../Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getProfileID, setCurrentProfile} from "../../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let idFromURL = this.props.router.params.id
        if(!idFromURL){
            idFromURL = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${idFromURL}`).then(response => {
            this.props.setCurrentProfile(response.data)
        })
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
export default connect(mapStateToProps, {getProfileID, setCurrentProfile})(withRouter(ProfileContainer))



