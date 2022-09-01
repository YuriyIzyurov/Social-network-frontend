import React, {useEffect, useState} from "react"
import 'pages/Posts/ProfilePage/ProfilePosts.scss'
import {PostType} from "typings/types";
import banner from "assets/images/Banner.png"
import {FormOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {AddPost} from "components/Main";
import {useNavigate} from "react-router";
import {postsAPI} from "api/postsAPI";
import {useSelector} from "react-redux";
import {getMe} from "redux/auth-selectors";
import PublicationShort from "pages/Posts/ProfilePage/PublicationShort";
import PublicationShortSkeleton from "components/Skeletons/PublicationShortSkeleton";
import {useAppDispatch} from "redux/reduxStore";
import {actions} from "redux/postsReducer";
import {getMyPosts} from "redux/post-selectors";


const ProfilePosts = () => {

    const [isPostAdding, setPostAdding] = useState(false);
    const [isAuth] = useSelector(getMe)
    const [topPosts, setTopPosts] = useState<PostType[]>([])
    const [isLoading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const myPosts = useSelector(getMyPosts)
    const navigate = useNavigate()

    const NumberOfDisplayedPosts = {length : 3}
    if(!isAuth) {
        NumberOfDisplayedPosts.length = 6
    }


    const loadMainPagePosts = async () => {
        setLoading(true)
        const responseTop = await postsAPI.getTopPosts()
        if(isAuth){
            const responseMy = await postsAPI.getMyPosts()
            if(responseMy.resultCode === 0) {
                dispatch(actions.loadMyPosts(responseMy.data.myPosts, responseMy.data.totalCount))
            }
        }
        setLoading(false)
        if(responseTop.resultCode === 0) {
            if(isAuth) {
                setTopPosts(responseTop.data.topPosts.slice(0,3))
            } else {
                setTopPosts(responseTop.data.topPosts)
            }
        }
    }


    useEffect(() => {
        loadMainPagePosts()
    },[isAuth])

    const postHandler = () => {
        setPostAdding(!isPostAdding)
    }
    const setMyPosts = () => {
        dispatch(actions.pickMineTab(true))
        navigate("/posts")
    }


    return  (
        <div className="profile__posts">
            <div className="profile__posts-animation">
                <img src={banner} alt='banner'/>
            </div>
            <div className="profile__posts-recommended">
                <div className="description">
                    <span>Featured</span>
                    <NavLink to="/posts"><span>See all</span></NavLink>
                </div>
            </div>
            <div className="profile__posts-publications">
                {isLoading
                    ?
                    Array.from(NumberOfDisplayedPosts).map((_,index) => <PublicationShortSkeleton key={'skeletonShort' + index}/>)
                    :
                    topPosts.map((item) => <PublicationShort key={item._id} item={item}/>)}
            </div>
            {isAuth
                &&
                <>
                    <div className="profile__posts-mine">
                        <div className="description">
                            <span>My posts</span>
                            <div className="description-options">
                                <span onClick={postHandler}><FormOutlined/></span>
                                <span onClick={setMyPosts}>See all</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile__posts-publications">
                        {isLoading && isAuth
                            ?
                            Array.from({length: 3}).map((_, index) => <PublicationShortSkeleton key={'skeletonShort' + index}/>)
                            :
                            myPosts.slice(0, 3).map((item) => <PublicationShort key={item._id} item={item}/>)}
                    </div>
                </>}
            {isPostAdding
                &&
                <AddPost
                    postHandler={postHandler}
                    currentPost={null} id={null}
                    getPostById={null}/>}
        </div>
    )
}

export default ProfilePosts