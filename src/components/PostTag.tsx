import React from 'react';
import {postsAPI} from "api/postsAPI";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "redux/reduxStore";
import {actions} from "redux/postsReducer";

const PostTag = ({item}:{item:string}) => {

    const dispatch = useAppDispatch()

    const getPostsWithTag = async () => {
        const response = await postsAPI.getTagMatch(item)
        dispatch(actions.setTotalPosts(response.length))
        dispatch(actions.setAllPosts(response))
    }

    return (
        <span onClick={getPostsWithTag}>
            #{item}
        </span>
    );
};

export default PostTag;