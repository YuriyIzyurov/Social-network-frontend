import React from 'react';
import {postsAPI} from "api/postsAPI";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "redux/reduxStore";
import {actions, handlingSetAllPosts} from "redux/postsReducer";

const PostTag = ({item}:{item:string}) => {

    const dispatch = useAppDispatch()

    const getPostsWithTag = () => {
        dispatch(handlingSetAllPosts(item))
    }

    return (
        <span onClick={getPostsWithTag}>
            #{item}
        </span>
    );
};

export default PostTag;