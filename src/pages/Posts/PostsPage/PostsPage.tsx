import React, {useEffect} from 'react';
import {AppStateType, useAppDispatch} from "redux/reduxStore";
import {getAllPosts, handlingAddPosts} from "redux/postsReducer";
import {useSelector} from "react-redux";
import {getActivePostPage, getFetching, getPosts, getPostsOnPage, getTotalCount} from "redux/post-selectors";
import PostShorten from 'pages/Posts/Post/PostShorten/PostShorten';
import {handlingAuthDataBlog} from "redux/authBlogReducer";
import {getMe} from "redux/auth-selectors";
import {Navigate, useParams} from "react-router";
import Scrollbar from "react-scrollbars-custom";
import Search from "antd/lib/input/Search";
import PostList from 'pages/Posts/PostsPage/PostList';
import PostsSidebar from 'pages/Posts/PostsSidebar/PostsSidebar';
import {Divider, Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "pages/Posts/PostSkeleton/PostSkeleton";
import {handlingAddUsers} from "redux/usersReducer";





const PostsPage = () => {

    const dispatch = useAppDispatch()
    const posts = useSelector(getPosts)
    const totalCount = useSelector(getTotalCount)
    const postsOnPage = useSelector(getPostsOnPage)
    const activePage = useSelector(getActivePostPage)
    const isFetching = useSelector(getFetching)
    const [isAuth, id] = useSelector(getMe)


    const isPagesLast = Math.abs(totalCount!/postsOnPage - activePage) < 1

    const nextPage = activePage + 1

    useEffect(() => {
        dispatch(handlingAuthDataBlog())
        dispatch(getAllPosts())
        console.log('use effect post page')
    },[])

    const loadMoreData = () => {
        dispatch(handlingAddPosts(nextPage, postsOnPage))
    }

    if (!isAuth) {
        return <Navigate to={"/login"}/>
    }

    return (

                <div id="scrollableDiv" className="all-posts">
                    <PostsSidebar/>

                    <InfiniteScroll
                        dataLength={posts.length}
                        next={loadMoreData}
                        hasMore={posts.length < 30}
                        loader={isPagesLast ? <Divider plain>It is all, nothing more 🤐</Divider> :
                            <PostSkeleton/>}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"

                    >
                        <PostList posts={posts} id={id} isFetching={isFetching}/>
                    </InfiniteScroll>

                </div>

    );
};

export default PostsPage;