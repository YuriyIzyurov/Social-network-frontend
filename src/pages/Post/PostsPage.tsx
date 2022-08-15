import React, {useEffect} from 'react';
import {useAppDispatch} from "../../redux/reduxStore";
import {getAllPosts} from "../../redux/postsReducer";
import {useSelector} from "react-redux";
import {getPosts} from "../../redux/post-selectors";
import PostShorten from './PostShorten';
import {handlingAuthDataBlog} from "../../redux/authBlogReducer";
import {getMe} from "../../redux/auth-selectors";
import {Navigate, useParams} from "react-router";

const PostsPage = () => {

    const dispatch = useAppDispatch()
    const posts = useSelector(getPosts)
    const [isAuth, id] = useSelector(getMe)


    useEffect(() => {
        dispatch(handlingAuthDataBlog())
        dispatch(getAllPosts())
        console.log('use effect post page')
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
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                isEditable={item.user._id === id}
            />)}
        </div>
    );
};

export default PostsPage;