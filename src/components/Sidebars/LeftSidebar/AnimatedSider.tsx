import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {CustomerServiceOutlined, HomeOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import classnames from "classnames";
import {useSelector} from "react-redux";
import {getCurrentProfile} from "redux/profile-selectors";
import {useTransition, animated} from "react-spring";
import ChatPage from "components/Chat/ChatPage";
import {useAppDispatch} from "redux/reduxStore";
import {actions, handlingAddUsers, handlingSidebarUsers} from "redux/usersReducer";
import {getFriends, getTotalFriends, getUsersOnPage} from "redux/user-selectors";
import FriendItem from "components/Sidebars/LeftSidebar/FriendItem";
import FriendItemShort from "components/Sidebars/LeftSidebar/FriendItemShort";
import {useNavigate} from "react-router";
import {getCurrentAuthor} from "redux/post-selectors";

const {Sider} = Layout

export const AnimatedSider = () => {

    const [isActive, setIsActive] = useState(false)
    const currentProfile = useSelector(getCurrentProfile)
    const friends = useSelector(getFriends)
    const currentAuthorID = useSelector(getCurrentAuthor)
    const usersOnPage = useSelector(getUsersOnPage)
    const totalFriends = useSelector(getTotalFriends)
    const transitionFriends = useTransition(isActive, {
        from:{y: 228, opacity: 0.8},
        enter:{y: 0, opacity: 1},
        leave:{y: 228, opacity: 0.8},
        config: {
            duration: 90,
        }
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(handlingSidebarUsers())
    },[])

    useEffect(() => {
            console.log(friends,totalFriends)
    },[friends])

    useEffect(() => {
        if(currentAuthorID){
            navigate('/posts')
        }
    },[currentAuthorID])

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
                       {/* <li>
                            <NavLink to="/test"><TeamOutlined /><span>Test</span></NavLink>
                        </li>*/}
                    </ul>

                    <div className="friends-block">
                        {friends
                            && <div className="friends">
                                    <span onClick={openFriendList}>Friends ({totalFriends})</span>
                                </div>}
                        <div className="friends__list">
                            {friends && friends.map((item) => <FriendItem item={item}/>)}
                        </div>
                    </div>
                    <div
                        className="toggle"
                        onClick={clickHandler}
                    >
                    </div>
                </div>
                {transitionFriends((style, item) =>
                    item ? <animated.div style={style} className="friends-block-short">
                        {friends
                            &&  <div className="friends-short">
                                    <span onClick={openFriendList}>Friends ({totalFriends})</span>
                                </div>}
                        <div className="friends__list-short">
                            {friends && friends.slice(0,5).map((item) => <FriendItemShort item={item}/>)}
                        </div>
                    </animated.div> : ''
                )}
                <ChatPage isActive={isActive}/>
            </Sider>
        </>
    );
};

