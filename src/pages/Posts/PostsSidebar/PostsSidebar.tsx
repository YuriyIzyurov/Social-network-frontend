import React, {useEffect, useState} from 'react';
import LastComment from 'pages/Posts/PostsSidebar/LastComment';
import {useAppDispatch} from "redux/reduxStore";
import {actions, getAllPosts} from "redux/postsReducer";
import {commentsAPI, postsAPI} from "api/postsAPI";
import Skeleton from 'antd/lib/skeleton/Skeleton';
import {CommentsType} from "typings/types";
import PostTag from 'components/PostTag';
import StyledSearch from 'components/StyledSearch';
import {Segmented} from 'antd';
import {SegmentedValue} from 'antd/lib/segmented';

type PropsType= {
    loadPopularPosts: () => void
    loadAllPosts: () => void
    loadMyPosts: () => void
    isMyTabPicked: boolean
}
const PostsSidebar:React.FC<PropsType> = ({loadPopularPosts, loadAllPosts, loadMyPosts, isMyTabPicked}) => {

    /*const [newActive, setNewActive] = useState(true)
    const [popActive, setPopActive] = useState(false)
    const [myActive, setMyActive] = useState(false)*/

    const [tags, setTags] = useState<string[] | undefined>(undefined)
    const [comments, setComments] = useState<CommentsType[] | undefined>(undefined)

    const dispatch = useAppDispatch()

    useEffect(() => {
       /* if(isMyTabPicked) {
            setMyActive(true)
            setPopActive(false)
            setNewActive(false)
        }*/
        getTags()
        getComments()
        return () => {
            dispatch(actions.pickMineTab(true))
        }
    }, [])

    const getComments = async () => {
        const response = await commentsAPI.getAll()
        setComments(response.data)
    }
    const getTags = async () => {
        const response = await postsAPI.getTags()
        setTags(response.data)
    }
    const searchPosts = (value:string) => {
        dispatch(getAllPosts(value)).then(() => {
            dispatch(actions.addSearchFilter(value))
        })
    }
    const newTabHandler = () => {
        /*setNewActive(true)
        setPopActive(false)
        setMyActive(false)*/
        loadAllPosts()
    }
    const popTabHandler = () => {
       /* setPopActive(true)
        setNewActive(false)
        setMyActive(false)*/
        loadPopularPosts()
    }
    const myTabHandler = () => {
        /*setMyActive(true)
        setPopActive(false)
        setNewActive(false)*/
        loadMyPosts()
    }
    const handleSegmentChange = (value:SegmentedValue) => {
        switch (value) {
            case "Новые":
                newTabHandler()
                break
            case "Популярные":
                popTabHandler()
                break
            case "Мои":
                myTabHandler()
                break
            default:
                break
        }
    }

    return (
        <div className="searchPost">
            <div className="searchPost__navigation">
                <Segmented
                    block
                    onChange={handleSegmentChange}
                    defaultValue={isMyTabPicked ? "Мои" : "Автор"}
                    options={[
                    "Новые",
                    "Популярные",
                    "Мои",
                    "Автор"
                ]} />
                {/*<span onClick={newTabHandler} className={newActive ? "navigation-active" : ""}>Новые</span>
                <span onClick={popTabHandler} className={popActive ? "navigation-active" : ""}>Популярные</span>
                <span onClick={myTabHandler} className={myActive ? "navigation-active" : ""}>Мои</span>*/}
            </div>
            <div className="searchPost__input">
                <StyledSearch searchPosts={searchPosts}/>
            </div>
            <div className="searchPost__tagBlock">
                <span>Популярные тэги</span>
                <div className="searchPost__tagBlock-tags">
                    {tags ? tags.map((item, index)=><PostTag key={'tag-' + index} item={item}/>)
                        : <Skeleton title={false}
                              active paragraph={{ rows: 5, width: ["60%","45%","50%","55%","40%",]}}/>}
                </div>
            </div>
            <div className="searchPost__comments">
                <span className="comments-description">Последние комментарии</span>
                <div className="searchPost__comments-list">
                    {comments?.map((item) => <LastComment key={item._id} item={item} />)}
                </div>
            </div>
        </div>
    );
};

export default PostsSidebar;