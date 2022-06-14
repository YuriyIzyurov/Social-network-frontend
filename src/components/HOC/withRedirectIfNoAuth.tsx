import {Navigate} from "react-router";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";


type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}
let mapStateToPropsForRedirect = (state: AppStateType): MapPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withRedirectIfNoAuth<P>(Component: React.ComponentType<P>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) =>{
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Navigate to='/login'/>
        }
        return <Component {...restProps as P} />;
    }

    return  connect<MapPropsType, DispatchPropsType, P, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
}







