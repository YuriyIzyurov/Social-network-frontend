import React, {useEffect} from "react"
import './Header.scss'
import {NavLink} from "react-router-dom";
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {getBloggerAvatar, getCurrentProfile, getLoggedUserPhoto, getMainColors} from "redux/Selectors";
import {useNavigate} from "react-router";
import {HeaderAvatar} from "components/CustomAvatars";
import {useAppDispatch} from "redux/reduxStore";
import {logoutFromServer} from "redux/Reducers";
import {chatAPI} from "api/chatAPI";
import { MiniAvatarBorder } from "assets/VectorComponents";
import {appActions, dialogActions, userActions} from "redux/Actions";
import {Tooltip} from "antd";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, handlingBlogUserLogout }) =>{

    const currentProfile = useSelector(getCurrentProfile)
    const colors = useSelector(getMainColors)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    const Logout = () => {
        dispatch(logoutFromServer()).then(() => {
            dispatch(userActions.deleteFriendsFromSidebar())
            dispatch(dialogActions.deleteNotificationNewMessages())
            navigate('/login')
        })
        handlingBlogUserLogout()
        chatAPI.stop()
    }


    return <div className="login">
            {!isAuth
                ?

                    <div className="login__header">
                        <span>Login</span>
                        <NavLink to={'/login'}>
                            <LoginOutlined onClick={() => dispatch(appActions.setRedirectToLogin(true)) }/>
                        </NavLink>
                    </div>
                :
                <>
                    <div className="login__avatar">
                        <HeaderAvatar photo={currentProfile?.photos.small as string} colors={colors}/>
                        <span>{login}</span>
                    </div>
                    <Tooltip mouseLeaveDelay={0.05}
                             mouseEnterDelay={0.3}
                             title="Выйти из аккаунта"
                    >
                        <LogoutOutlined onClick={Logout}/>
                    </Tooltip>
                </>
            }
        </div>
}

export default Header