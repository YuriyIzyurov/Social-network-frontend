import React from "react"
import './Header.scss'
import {NavLink} from "react-router-dom";
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {getLoggedUserPhoto, getMainColors} from "redux/Selectors";
import {useNavigate} from "react-router";
import {HeaderAvatar} from "components/CustomAvatars";
import {useAppDispatch} from "redux/reduxStore";
import {logoutFromServer} from "redux/Reducers";
import {chatAPI} from "api/chatAPI";
import { MiniAvatarBorder } from "assets/VectorComponents";
import {appActions, dialogActions, userActions} from "redux/Actions";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    handlingBlogUserLogout: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, handlingBlogUserLogout }) =>{

    const loggedUserPhoto = useSelector(getLoggedUserPhoto)
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