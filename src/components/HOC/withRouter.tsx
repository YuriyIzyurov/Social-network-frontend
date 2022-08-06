import {useLocation, useNavigate, useParams} from "react-router-dom";
import React from "react";

export function withRouter<P>(Container: React.ComponentType<P>){
    const ComponentWithRouterProp = (props: P) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Container
                {...props}
                router={{location, navigate, params}} />
        )
    }
    return ComponentWithRouterProp
}
