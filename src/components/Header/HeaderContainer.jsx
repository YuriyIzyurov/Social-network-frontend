import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setUserAuth} from "../../redux/authReducer";
import axios from "axios";


class HeaderContainer extends React.Component{

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
debugger
            this.props.setUserAuth(response.data)
        })
    }

    render() {
       return <Header {...this.props}/>
    }
}
const mapStateToProps = (state) =>{}


export default connect(mapStateToProps, {setUserAuth})(HeaderContainer)

