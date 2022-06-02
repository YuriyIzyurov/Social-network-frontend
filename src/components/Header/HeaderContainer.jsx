import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {handlingAuthData, logoutFromServer} from "../../redux/authReducer";




class HeaderContainer extends React.Component{


    render() {
       return <Header {...this.props}  />
    }
}
const mapStateToProps = (state) =>{

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {handlingAuthData, logoutFromServer})(HeaderContainer)

