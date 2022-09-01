import React from "react"
import './Header.scss'
import {NavLink} from "react-router-dom";
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {getLoggedUserPhoto, getMainColors} from "redux/profile-selectors";
import {useNavigate} from "react-router";
import HeaderAvatar from "components/HeaderAvatar";
import MiniAvatarBorder from "components/MiniAvatarBorder";
import {actions} from "redux/appReducer";
import {actions as userActions} from "redux/usersReducer";
import {useAppDispatch} from "redux/reduxStore";
import {logoutFromServer} from "redux/authReducer";
import {chatAPI} from "api/chatAPI";


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
                            <LoginOutlined onClick={() => dispatch(actions.setRedirectToLogin(true)) }/>
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