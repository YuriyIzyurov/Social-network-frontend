import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {ReadOutlined, HomeOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
import {Layout, Tooltip} from 'antd';
import classnames from "classnames";
import {useSelector} from "react-redux";
import {getRedirectDialogStatus, getRedirectDialogPage, getRedirectLoginStatus,getFriends, getTotalFriends,getCurrentAuthor } from "redux/Selectors";
import {animated, useTransition} from "react-spring";
import {useAppDispatch} from "redux/reduxStore";
import {handlingSidebarUsers} from "redux/Reducers";
import {useNavigate} from "react-router";
import { FriendItem, FriendItemShort} from './../index';
import { ChatPage } from 'App';


const {Sider} = Layout

export const AnimatedSider:React.FC<{isAuth:boolean}> = ({isAuth}) => {

    const [isActive, setIsActive] = useState(false)

    const redirectToDialog = useSelector(getRedirectDialogStatus)
    const friends = useSelector(getFriends)
    const currentAuthorID = useSelector(getCurrentAuthor)
    const totalFriends = useSelector(getTotalFriends)
    const redirectToLogin = useSelector(getRedirectLoginStatus)
    const redirectToDialogPage = useSelector(getRedirectDialogPage)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const transitionFriends = useTransition(isActive, {
        from:{
            y: 228,
            opacity: 0.8
        },
        enter:{
            y: 0,
            opacity: 1
        },

        config: {
            duration: 100,
        }
    })

    useEffect(() => {
        dispatch(handlingSidebarUsers())
    },[totalFriends])

    useEffect(() => {
        if(currentAuthorID){
            navigate('/posts')
        }
        if(redirectToDialog){
            navigate(`/dialogs/${redirectToDialog}`)
        }
        if(redirectToDialogPage){
            navigate(`/dialogs`)
        }
        if(redirectToLogin){
            navigate(`/login`)
        }
    },[currentAuthorID, redirectToDialog, redirectToLogin, redirectToDialogPage])

    useEffect(() => {
        if(!isAuth) {
            setIsActive(false)
        }
    }, [isAuth])

    const clickHandler = () => {
        setIsActive(!isActive)
    }
    const openFriendList = () => {
        navigate('/users?friend=true')
    }

    return (
        <>
            <Sider>
                <div className={classnames("site__layout-left-sider", {
                    "left-sider-active": isActive,
                    "left-sider-inactive" : !isActive
                })}>
                    <ul>
                        <li>
                            <NavLink to="/profile"><HomeOutlined className='nav-icon'/><span>Главная</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialogs"><MessageOutlined className='nav-icon'/><span>Сообщения</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts"><ReadOutlined className='nav-icon'/><span>Статьи</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/users"><TeamOutlined className='nav-icon'/><span>Сообщество</span></NavLink>
                        </li>
                    </ul>
                    {!isActive && <div className="friends-block">
                        {friends.length !== 0
                            && <div className="friends">
                                <span onClick={openFriendList}>Друзья ({totalFriends})</span>
                            </div>}
                        <div className="friends__list">
                            {friends && friends.map((item) => <FriendItem key={item.id} item={item}/>)}
                        </div>
                    </div>}
                    {isAuth
                        &&
                        <Tooltip mouseLeaveDelay={0.05}
                                 mouseEnterDelay={0.5}
                                 title={isActive ? "Закрыть чат" : "Открыть чат"}
                        >
                            <div className="toggle" onClick={clickHandler}></div>
                        </Tooltip>
                    }
                    {transitionFriends((style, item) =>
                        item ? <animated.div style={style} className="friends-block-short">
                            {friends
                                &&  <div className="friends-short">
                                    <span onClick={openFriendList}>Друзья ({totalFriends})</span>
                                </div>}
                            <div className="friends__list-short">
                                {friends && friends.slice(0,5).map((item) => <FriendItemShort key={item.id} item={item}/>)}
                            </div>
                        </animated.div> : ''
                    )}
                    {isAuth && <ChatPage isActive={isActive}/>}
                </div>
            </Sider>
        </>
    );
};

