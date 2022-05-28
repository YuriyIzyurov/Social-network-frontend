import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setUserAuth} from "../../redux/authReducer";
import {authAPI} from "../../api/api";


class HeaderContainer extends React.Component{

    componentDidMount() {
        authAPI.getAuth().then(response => {
           if(response.data.resultCode === 0){
                let {email, id, login} = response.data.data
                this.props.setUserAuth(email, id, login)}
        })
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


export default connect(mapStateToProps, {setUserAuth})(HeaderContainer)

