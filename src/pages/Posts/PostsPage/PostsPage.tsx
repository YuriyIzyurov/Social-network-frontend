import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "redux/reduxStore";
import {actions, getAllPosts, handlingAddPosts} from "redux/postsReducer";
import {useSelector} from "react-redux";
import {
    getActivePostPage,
    getCurrentFilter,
    getFetching,
    getPosts,
    getPostsOnPage,
    getTotalCount
} from "redux/post-selectors";
import {handlingAuthDataBlog} from "redux/authBlogReducer";
import {getMe} from "redux/auth-selectors";
import {Navigate} from "react-router";
import Scrollbar from "react-scrollbars-custom";
import PostList from 'pages/Posts/PostsPage/PostList';
import PostsSidebar from 'pages/Posts/PostsSidebar/PostsSidebar';
import {ScrollState} from 'typings/types';


const PostsPage = () => {

    const dispatch = useAppDispatch()
    const posts = useSelector(getPosts)
    const totalCount = useSelector(getTotalCount)
    const postsOnPage = useSelector(getPostsOnPage)
    const activePage = useSelector(getActivePostPage)
    const isFetching = useSelector(getFetching)
    const [isAuth, id] = useSelector(getMe)
    const searchFilter = useSelector(getCurrentFilter)
    const [isDataLoading, setDataLoading] = useState(false)



    const isPagesLast = Math.abs(Math.ceil(totalCount!/postsOnPage) - activePage) < 1

    const nextPage = activePage + 1

    useEffect(() => {
        dispatch(handlingAuthDataBlog())
        dispatch(getAllPosts())
        return () => {
            dispatch(actions.addSearchFilter(null))
        }
    },[])


    useEffect(() => {

        if(isDataLoading){
            dispatch(handlingAddPosts(nextPage, postsOnPage, searchFilter)).then(() => {
                setDataLoading(false)
            })

        }
    },[isDataLoading])


    const isScrollState = (eventOrState: React.UIEvent<HTMLDivElement, UIEvent> | ScrollState):eventOrState is ScrollState => {
        return 'clientHeight' in eventOrState;
    }
    const scrollHandler = (state: React.UIEvent<HTMLDivElement, UIEvent> | ScrollState) => {
        if (isScrollState(state)) {
            if(state.scrollHeight - (state.scrollTop + state.clientHeight) < 120
                && !isPagesLast)
                setDataLoading(true)
        }
    }


    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }

    return (

                <div className="all-posts">
                    <PostsSidebar/>
                    <Scrollbar onScroll={scrollHandler}>
                    <PostList posts={posts} id={id} isFetching={isFetching}/>
                    </Scrollbar>
                </div>


    );
};

export default PostsPage;