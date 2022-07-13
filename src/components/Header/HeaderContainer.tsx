import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {handlingAuthData, logoutFromServer} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";
import {PhotosType} from "../../typings/types";
//классовая компонента с коннектом для примера



type StatePropsHeaderType = {
    isAuth: boolean
    login: string | null
    photo: string | null | undefined
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
        login: state.auth.login,
        photo: state.auth.photos?.small
    }
}


export default connect<StatePropsHeaderType,DispatchPropsHeaderType,{},AppStateType >(mapStateToProps, {handlingAuthData, logoutFromServer})(HeaderContainer)

