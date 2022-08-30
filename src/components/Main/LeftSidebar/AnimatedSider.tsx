import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {CustomerServiceOutlined, HomeOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import classnames from "classnames";
import {useSelector} from "react-redux";
import {getRedirectDialogStatus} from "redux/profile-selectors";
import {animated, useTransition} from "react-spring";
import {useAppDispatch} from "redux/reduxStore";
import {handlingSidebarUsers} from "redux/usersReducer";
import {getFriends, getTotalFriends} from "redux/user-selectors";
import {useNavigate} from "react-router";
import {getCurrentAuthor} from "redux/post-selectors";
import { FriendItemShort, FriendItem, ChatPage } from './../index';
import {actions} from "redux/appReducer";
import {getRedirectLoginStatus} from "redux/app-selector";


const {Sider} = Layout

export const AnimatedSider:React.FC = () => {

    const [isActive, setIsActive] = useState(false)

    const redirectToDialog = useSelector(getRedirectDialogStatus)
    const friends = useSelector(getFriends)
    const currentAuthorID = useSelector(getCurrentAuthor)
    const totalFriends = useSelector(getTotalFriends)
    const redirectToLogin = useSelector(getRedirectLoginStatus)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const transitionFriends = useTransition(isActive, {
        from:{y: 228, opacity: 0.8},
        enter:{y: 0, opacity: 1},
        leave:{y: 228, opacity: 0.8},
        config: {
            duration: 90,
        }
    })

    useEffect(() => {
        dispatch(handlingSidebarUsers())
    },[])

    useEffect(() => {
        if(currentAuthorID){
            navigate('/posts')
        }
        if(redirectToDialog){
            navigate(`/dialogs/${redirectToDialog}`)
        }
        if(redirectToLogin){
            navigate(`/login`)
        }
    },[currentAuthorID, redirectToDialog, redirectToLogin])

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
                            <NavLink to="/profile"><HomeOutlined /><span>Profile</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialogs"><MessageOutlined /><span>Messages</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts"><CustomerServiceOutlined /><span>All posts</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/users"><TeamOutlined /><span>Find friends</span></NavLink>
                        </li>
                    </ul>
                    <div className="friends-block">
                        {friends.length !== 0
                            && <div className="friends">
                                    <span onClick={openFriendList}>Friends ({totalFriends})</span>
                                </div>}
                        <div className="friends__list">
                            {friends && friends.map((item) => <FriendItem key={item.id} item={item}/>)}
                        </div>
                    </div>
                    <div className="toggle" onClick={clickHandler}></div>
                </div>
                {transitionFriends((style, item) =>
                    item ? <animated.div style={style} className="friends-block-short">
                        {friends
                            &&  <div className="friends-short">
                                    <span onClick={openFriendList}>Friends ({totalFriends})</span>
                                </div>}
                        <div className="friends__list-short">
                            {friends && friends.slice(0,5).map((item) => <FriendItemShort key={item.id} item={item}/>)}
                        </div>
                    </animated.div> : ''
                )}
                <ChatPage isActive={isActive}/>
            </Sider>
        </>
    );
};

