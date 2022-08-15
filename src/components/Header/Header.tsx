import React, {useEffect} from "react"

import {NavLink, useLocation} from "react-router-dom";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar/avatar";
import {PhotosType} from "../../typings/types";
import {useSelector} from "react-redux";
import {getAuthAvatar, getCurrentProfile, getLoggedUserPhoto} from "../../redux/profile-selectors";
import {Navigate} from "react-router";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, logoutFromServer,handlingBlogUserLogout }) =>{

    const loggedUserPhoto = useSelector(getLoggedUserPhoto)

    const Logout = () => {
        logoutFromServer()
        handlingBlogUserLogout()
    }

    return <div className="login">
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                : <div>
                    <div>
                        <Avatar src={loggedUserPhoto ? loggedUserPhoto.small : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUWgApzeLkRHZjMcLb9wzsJuNzjqTRxzRBqs99_I&s"} />
                        {login}
                        <Button onClick={Logout}>Logout</Button>
                    </div>
                </div>
            }
        </div>
}

export default Header