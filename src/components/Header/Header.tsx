import React, {useEffect, useState} from "react"
import './Header.scss'
import {NavLink, useLocation} from "react-router-dom";
import Button from "antd/lib/button";
import { LogoutOutlined } from '@ant-design/icons';
import {PhotosType} from "../../typings/types";
import {useSelector} from "react-redux";
import {getAuthAvatar, getCurrentProfile, getLoggedUserPhoto, getMainColors} from "redux/profile-selectors";
import {Navigate, useNavigate} from "react-router";
import HeaderAvatar from "components/HeaderAvatar";
import MiniAvatarBorder from "components/MiniAvatarBorder";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, logoutFromServer,handlingBlogUserLogout }) =>{

    const loggedUserPhoto = useSelector(getLoggedUserPhoto)
    const colors = useSelector(getMainColors)
    const navigate = useNavigate()

    const Logout = () => {
        logoutFromServer()
        handlingBlogUserLogout()
        navigate('/login')
    }

    return <div className="login">
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                :
                <>
                    <div className="header__avatar">
                        <MiniAvatarBorder colors={colors}/>
                        <HeaderAvatar photos={loggedUserPhoto}/>
                        <span>{login}</span>
                    </div>
                    <LogoutOutlined onClick={Logout}/>
                </>
            }
        </div>
}

export default Header