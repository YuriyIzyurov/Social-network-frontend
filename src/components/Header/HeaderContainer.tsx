import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {handlingAuthData, logoutFromServer} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";




type StatePropsHeaderType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsHeaderType = {
    handlingAuthData: () => void
    logoutFromServer: () => void
}
class HeaderContainer extends React.Component<StatePropsHeaderType & DispatchPropsHeaderType>{

    render() {
       return <Header {...this.props}  />
    }
}
const mapStateToProps = (state: AppStateType) : StatePropsHeaderType =>{

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


export default connect<StatePropsHeaderType,DispatchPropsHeaderType,{},AppStateType >(mapStateToProps, {handlingAuthData, logoutFromServer})(HeaderContainer)

