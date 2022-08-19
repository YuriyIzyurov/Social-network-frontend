import React, { ChangeEvent, useEffect, useState } from 'react';
import Search from "antd/lib/input/Search";
import LastComment from 'pages/Posts/PostsSidebar/LastComment';
import {useAppDispatch} from "redux/reduxStore";
import {actions, getAllPosts} from "redux/postsReducer";
import {commentsAPI, postsAPI} from "api/postsAPI";
import Skeleton from 'antd/lib/skeleton/Skeleton';
import {CommentsType} from "typings/types";
import PostTag from 'components/PostTag';
import classnames from "classnames";


type PropsType= {
    loadPopularPosts: () => void
    loadAllPosts: () => void
    loadMyPosts: () => void
    isMyTabPicked: boolean
}
const PostsSidebar:React.FC<PropsType> = ({loadPopularPosts, loadAllPosts, loadMyPosts, isMyTabPicked}) => {

    const [newActive, setNewActive] = useState(true)
    const [popActive, setPopActive] = useState(false)
    const [myActive, setMyActive] = useState(false)

    const [tags, setTags] = useState<string[] | undefined>(undefined)
    const [comments, setComments] = useState<CommentsType[] | undefined>(undefined)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(isMyTabPicked) {
            setMyActive(true)
            setPopActive(false)
            setNewActive(false)
        }
        getTags()
        getComments()
    }, [])

    const getComments = async () => {
        const response = await commentsAPI.getAll()
        setComments(response)
    }
    const getTags = async () => {
        const response = await postsAPI.getTags()
        setTags(response)
    }
    const searchPosts = (value:string) => {
        dispatch(getAllPosts(value)).then(() => {
            dispatch(actions.addSearchFilter(value))
        })
    }
    const newTabHandler = () => {
        setNewActive(true)
        setPopActive(false)
        setMyActive(false)
        loadAllPosts()
    }
    const popTabHandler = () => {
        setPopActive(true)
        setNewActive(false)
        setMyActive(false)
        loadPopularPosts()
    }
    const myTabHandler = () => {
        setMyActive(true)
        setPopActive(false)
        setNewActive(false)
        loadMyPosts()
    }

    return (
        <div className="searchPost">
            <div className="searchPost__navigation">
                <span onClick={newTabHandler} className={newActive ? "navigation-active" : ""}>Новые</span>
                <span onClick={popTabHandler} className={popActive ? "navigation-active" : ""}>Популярные</span>
                <span onClick={myTabHandler} className={myActive ? "navigation-active" : ""}>Мои</span>
            </div>
            <div className="searchPost__input">
                <Search  placeholder="Поиск по названию, тэгам" allowClear  onSearch={searchPosts}/>
            </div>
            <div className="searchPost__tagBlock">
                <span>Популярные тэги</span>
                <div className="searchPost__tagBlock-tags">
                    {tags ? tags.map((item)=><PostTag item={item}/>)
                        : <Skeleton title={false}
                              active paragraph={{ rows: 5, width: ["60%","45%","50%","55%","40%",]}}/>}
                </div>
            </div>
            <div className="searchPost__comments">
                <span className="comments-description">Последние комментарии</span>
                <div className="searchPost__comments-list">
                    {comments?.map((item) => <LastComment item={item} />)}
                </div>
            </div>
        </div>
    );
};

export default PostsSidebar;