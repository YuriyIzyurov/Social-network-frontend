import React from 'react';
import {useAppDispatch} from "redux/reduxStore";
import {postsAPI} from "api/postsAPI";
import {EyeOutlined} from '@ant-design/icons';
import {TopUserType} from "typings";
import { postActions } from 'redux/Actions';
import {getUserStatusInProfile, setProfileOnPage} from "redux/Reducers";


export const TopWriter = ({user, index}:{user:TopUserType, index:number}) => {

    const dispatch = useAppDispatch()

    const getPostsByAuthor = async () => {
        console.log(user)
        const response = await postsAPI.getPostsByAuthor(user.id)
        dispatch(setProfileOnPage(user.socialId))
        dispatch(getUserStatusInProfile(user.socialId))
        dispatch(postActions.setScrollToTop(true))
        dispatch(postActions.setActivePostPage(1))
        dispatch(postActions.setTotalPosts(response.data.length))
        dispatch(postActions.setAllPosts(response.data))
        dispatch(postActions.pickAuthorTab(true))
        dispatch(postActions.setCurrentAuthorId(user.id))
    }

    return (
        <div onClick={getPostsByAuthor} className="members__list-item list-item-card rank-animation">
            <div className="clip-avatar">
                <img  src={user.avatarUrl} alt='ava'/>
            </div>
            <div className="members__list-item-name">
                <span>{user.fullName}</span>
               <span>
                   <EyeOutlined />
                   <span>
                       {user.viewsCount}
                   </span>
               </span>
            </div>
            <div className="rank-number">
                <span><small>#</small>{index}</span>
            </div>
        </div>
    );
};

