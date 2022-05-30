import {useLocation, useNavigate, useParams} from "react-router";
import React from "react";

export const withRouter = (Container) =>{
    function ComponentWithRouterProp(props){
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
