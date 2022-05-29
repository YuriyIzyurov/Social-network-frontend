import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {handlingAuthData} from "../../redux/authReducer";




class HeaderContainer extends React.Component{

    componentDidMount() {
        this.props.handlingAuthData()
    }

    render() {
       return <Header {...this.props}/>
    }
}
const mapStateToProps = (state) =>{

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect(mapStateToProps, {handlingAuthData})(HeaderContainer)

