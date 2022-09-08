import React from 'react';
import {useAppDispatch} from "redux/reduxStore";
import { handlingSetAllPosts} from "redux/postsReducer";

const PostTag = ({item}:{item:string}) => {

    const dispatch = useAppDispatch()

    const getPostsWithTag = () => {
        dispatch(handlingSetAllPosts(item))
    }

    return (
        <li onClick={getPostsWithTag}>
            #{item}
        </li>
    );
};

export default PostTag;