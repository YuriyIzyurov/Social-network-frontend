import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "redux/reduxStore";
import {actions, getAllPosts, handlingAddPosts} from "redux/postsReducer";
import {useSelector} from "react-redux";
import {
    getActivePostPage,
    getCurrentFilter,
    getFetching, getMyPosts, getMyTabPickStatus, getMyTotalPosts,
    getPosts,
    getPostsOnPage, getScrollState,
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
    const myPosts = useSelector(getMyPosts)
    const myTotalPosts = useSelector(getMyTotalPosts)
    const totalCount = useSelector(getTotalCount)
    const isScrollTop = useSelector(getScrollState)
    const postsOnPage = useSelector(getPostsOnPage)
    const activePage = useSelector(getActivePostPage)
    const isFetching = useSelector(getFetching)
    const isMyTabPicked = useSelector(getMyTabPickStatus)
    const [isAuth, id] = useSelector(getMe)
    const searchFilter = useSelector(getCurrentFilter)
    const [isDataLoading, setDataLoading] = useState(false)
    const [isPopularFilter, setPopularFilter] = useState(false)
    const scrollbarRef = useRef<Scrollbar & HTMLDivElement>(null)



    const isPagesLast = Math.abs(Math.ceil(totalCount!/postsOnPage) - activePage) < 1

    const nextPage = activePage + 1

    useEffect(() => {
        if(isMyTabPicked) {
            loadMyPosts()
            dispatch(actions.pickMineTab(false))
        }
        return () => {
            dispatch(actions.addSearchFilter(null))
        }
    },[])

   useEffect(() => {

       if(isScrollTop){
           scrollbarRef?.current?.scrollToTop()
       }
   }, [posts])

    useEffect(() => {
        if(isDataLoading){
                dispatch(actions.setScrollToTop(false))
                dispatch(handlingAddPosts(nextPage, postsOnPage, searchFilter, isPopularFilter)).then(()=>{
                    setDataLoading(false)
                })

        }
    },[isDataLoading])


    const loadMyPosts = useCallback(() => {
        dispatch(actions.setAllPosts(myPosts))
        dispatch(actions.setTotalPosts(myTotalPosts))
        dispatch(actions.setActivePostPage(1))
        setPopularFilter(false)
        scrollbarRef?.current?.scrollToTop()
    },[myPosts, myTotalPosts])

    const loadAllPosts = useCallback(() => {
        dispatch(getAllPosts())
        setPopularFilter(false)
        scrollbarRef?.current?.scrollToTop()
    },[myPosts])

    const loadPopularPosts = useCallback(() => {
        dispatch(getAllPosts(null,true))
        setPopularFilter(true)
        scrollbarRef?.current?.scrollToTop()
    },[myPosts])


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
                    <PostsSidebar loadMyPosts={loadMyPosts}
                                  loadAllPosts={loadAllPosts}
                                  loadPopularPosts={loadPopularPosts}
                                  isMyTabPicked={isMyTabPicked}
                    />
                    <Scrollbar  ref={scrollbarRef} onScroll={scrollHandler} >
                    <PostList posts={posts} id={id} isFetching={isFetching}/>
                    </Scrollbar>
                </div>


    );
};

export default PostsPage;