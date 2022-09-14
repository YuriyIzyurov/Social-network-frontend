import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {handlingAuthData, logoutFromServer} from "redux/Reducers";
import {AppStateType} from "redux/reduxStore";
import {handlingBlogUserLogout} from "redux/Reducers";
//классовая компонента с коннектом для примера



type StatePropsHeaderType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsHeaderType = {
    handlingAuthData: () => void
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
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


export default connect<StatePropsHeaderType,DispatchPropsHeaderType,{},AppStateType >(mapStateToProps, {handlingAuthData, logoutFromServer, handlingBlogUserLogout})(HeaderContainer)

