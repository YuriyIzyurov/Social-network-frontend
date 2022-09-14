import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "redux/reduxStore";
import {handlingGetAllPosts, handlingAddPosts} from "redux/Reducers";
import {useSelector} from "react-redux";
import {
    getActivePostPage,
    getCurrentFilter,
    getFetching, getMyPosts, getMyTabPickStatus, getMyTotalPosts,
    getPosts,
    getPostsOnPage, getScrollState,
    getTotalCount,getBloggerID, getMe
} from "redux/Selectors";
import Scrollbar from "react-scrollbars-custom";
import {PostList, PostsSidebar} from 'pages/Posts';
import {ScrollState} from 'typings';
import {postActions} from "redux/Actions";



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
    const isAuthorTabPicked = useSelector(getMyTabPickStatus)
    const id = useSelector(getBloggerID)
    const isAuth = useSelector(getMe)
    const searchFilter = useSelector(getCurrentFilter)
    const [isDataLoading, setDataLoading] = useState(false)
    const [isPopularFilter, setPopularFilter] = useState(false)
    const scrollbarRef = useRef<Scrollbar & HTMLDivElement>(null)



    const isPagesLast = Math.abs(Math.ceil(totalCount!/postsOnPage) - activePage) < 1

    const nextPage = activePage + 1

    useEffect(() => {
        if(!isAuthorTabPicked) {
            loadAllPosts()
        }
        return () => {
            dispatch(postActions.addSearchFilter(null))
        }
    },[])

   useEffect(() => {

       if(isScrollTop){
           scrollbarRef?.current?.scrollToTop()
       }
   }, [posts])

    useEffect(() => {
        if(isDataLoading){
                dispatch(postActions.setScrollToTop(false))
                dispatch(handlingAddPosts(nextPage, postsOnPage, searchFilter, isPopularFilter)).then(()=>{
                    setDataLoading(false)
                })

        }
    },[isDataLoading])


    const loadMyPosts = useCallback(() => {
        dispatch(postActions.setAllPosts(myPosts))
        dispatch(postActions.setTotalPosts(myTotalPosts))
        dispatch(postActions.setActivePostPage(1))
        setPopularFilter(false)
        scrollbarRef?.current?.scrollToTop()
    },[myPosts, myTotalPosts])

    const loadAllPosts = useCallback(() => {
        dispatch(handlingGetAllPosts())
        setPopularFilter(false)
        scrollbarRef?.current?.scrollToTop()
    },[posts])

    const loadPopularPosts = useCallback(() => {
        dispatch(handlingGetAllPosts(null,true))
        setPopularFilter(true)
        scrollbarRef?.current?.scrollToTop()
    },[posts])


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


    return (

                <div className="all-posts">
                    <PostsSidebar loadMyPosts={loadMyPosts}
                                  loadAllPosts={loadAllPosts}
                                  loadPopularPosts={loadPopularPosts}
                                  isAuthorTabPicked={isAuthorTabPicked}
                                  isAuth={isAuth}
                    />
                    <Scrollbar  ref={scrollbarRef} onScroll={scrollHandler} >
                        <PostList posts={posts} id={id} isFetching={isFetching}/>
                    </Scrollbar>
                </div>


    );
};

export default PostsPage;