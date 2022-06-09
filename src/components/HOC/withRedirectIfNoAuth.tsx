import {Navigate} from "react-router";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";

type PropsType = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: AppStateType): PropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withRedirectIfNoAuth =  <P extends object>(Component: React.ComponentType<P>) => {

        class RedirectComponent extends React.Component<P & PropsType> {
            render() {
                if (!this.props.isAuth) {
                    return <Navigate to='/login' />
                }
                return <Component {...this.props as P} />;
            }
        }
    return  connect(mapStateToPropsForRedirect)(RedirectComponent as any)
}







