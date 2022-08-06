import React, {useEffect} from 'react';
import {useAppDispatch} from "../../redux/reduxStore";
import {getAllPosts} from "../../redux/postsReducer";
import {useSelector} from "react-redux";
import {getPosts} from "../../redux/post-selectors";
import PostShorten from './PostShorten';
import {handlingAuthDataBlog} from "../../redux/authBlogReducer";
import {getMe} from "../../redux/auth-selectors";
import {Navigate} from "react-router";

const PostsPage = () => {

    const dispatch = useAppDispatch()
    const posts = useSelector(getPosts)
    const isAuth = useSelector(getMe)

    useEffect(() => {
        dispatch(handlingAuthDataBlog())
        dispatch(getAllPosts())
    },[])

    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className="all-posts">
            {posts.map((item) => <PostShorten
                key={item._id}
                id={item._id}
                imageUrl={item.imageUrl}
                title={item.title}
                tags={item.tags}
                text={item.text}
                user={item.user}
                viewsCount={item.viewsCount}/>)}
        </div>
    );
};

export default PostsPage;