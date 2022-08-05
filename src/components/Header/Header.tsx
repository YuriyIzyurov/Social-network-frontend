import React, {useEffect} from "react"

import {NavLink} from "react-router-dom";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar/avatar";
import {PhotosType} from "../../typings/types";
import {useSelector} from "react-redux";
import {getAuthAvatar, getCurrentProfile} from "../../redux/profile-selectors";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, logoutFromServer,handlingBlogUserLogout }) =>{

    const currentProfile = useSelector(getCurrentProfile)

    const Logout = () => {
        logoutFromServer()
        handlingBlogUserLogout()
    }

    return <div className="login">
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                : <div>
                    <div>
                        <Avatar src={currentProfile ? currentProfile.photos.small : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUWgApzeLkRHZjMcLb9wzsJuNzjqTRxzRBqs99_I&s"} />
                        {login}
                        <Button onClick={Logout}>Logout</Button>
                    </div>
                </div>
            }
        </div>
}

export default Header