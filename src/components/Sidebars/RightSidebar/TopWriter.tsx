import React from 'react';
import {TopUserType} from "components/Sidebars/RightSidebar/ProfileInfo";
import {useAppDispatch} from "redux/reduxStore";
import {postsAPI} from "api/postsAPI";
import {actions} from "redux/postsReducer";
import {EyeOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router";



const TopWriter = ({user}:{user:TopUserType}) => {

    const dispatch = useAppDispatch()

    const getPostsByAuthor = async () => {
        const response = await postsAPI.getPostsByAuthor(user.id)
        dispatch(actions.setScrollToTop(true))
        dispatch(actions.setActivePostPage(1))
        dispatch(actions.setTotalPosts(response.length))
        dispatch(actions.setAllPosts(response))
        dispatch(actions.pickMineTab(false))
        dispatch(actions.setCurrentAuthorId(user.id))
    }

    return (
        <div onClick={getPostsByAuthor} className="members__list-item">
            <div className="members__list-item-avatar">
                <img style={{width:"44px", height:"44px"}} src={user.avatarUrl} alt='ava'/>
            </div>
            <div className="members__list-item-name">
                <span>{user.fullName}</span>
               <span><EyeOutlined />{user.viewsCount}</span>
            </div>
        </div>
    );
};

export default TopWriter;