import React, {useEffect, useState} from 'react';
import LastComment from 'pages/Posts/PostsSidebar/LastComment';
import {useAppDispatch} from "redux/reduxStore";
import {actions, handlingGetAllPosts} from "redux/postsReducer";
import {commentsAPI, postsAPI} from "api/postsAPI";
import Skeleton from 'antd/lib/skeleton/Skeleton';
import {CommentsType} from "typings/types";
import PostTag from 'components/PostTag';
import StyledSearch from 'components/Forms/StyledSearch';
import {Segmented} from 'antd';
import {SegmentedValue} from 'antd/lib/segmented';

type PropsType= {
    loadPopularPosts: () => void
    loadAllPosts: () => void
    loadMyPosts: () => void
    isAuthorTabPicked: boolean
    isAuth: boolean
}
const PostsSidebar:React.FC<PropsType> = ({loadPopularPosts, loadAllPosts, loadMyPosts, isAuthorTabPicked, isAuth}) => {

    const [tags, setTags] = useState<string[] | undefined>(undefined)
    const [comments, setComments] = useState<CommentsType[] | undefined>(undefined)
    const [currentValue, setCurrentValue] = useState("Новые")

    const dispatch = useAppDispatch()

    useEffect(() => {
        getTags()
        getComments()
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
        dispatch(handlingGetAllPosts(value)).then(() => {
            dispatch(actions.addSearchFilter(value))
        })
    }
    const newTabHandler = () => {
        loadAllPosts()
        dispatch(actions.pickAuthorTab(false))
    }
    const popTabHandler = () => {
        loadPopularPosts()
        dispatch(actions.pickAuthorTab(false))
    }
    const myTabHandler = () => {
        loadMyPosts()
        dispatch(actions.pickAuthorTab(false))
    }
    const handleSegmentChange = (value:SegmentedValue) => {
        switch (value) {
            case "Новые":
                newTabHandler()
                setCurrentValue("Новые")
                break
            case "Популярные":
                popTabHandler()
                setCurrentValue("Популярные")
                break
            case "Мои":
                myTabHandler()
                setCurrentValue("Мои")
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
                    defaultValue={"Новые"}
                    value={isAuthorTabPicked ? "Автор" : currentValue}
                    options={[
                    "Новые",
                    "Популярные",
                    { label: 'Мои', value: 'Мои', disabled: !isAuth },
                    "Автор"
                ]} />

            </div>
            <div className="searchPost__input">
                <StyledSearch onSearch={searchPosts}/>
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