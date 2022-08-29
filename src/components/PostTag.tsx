import React from 'react';
import {useAppDispatch} from "redux/reduxStore";
import { handlingSetAllPosts} from "redux/postsReducer";

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