import React, { ChangeEvent, useEffect, useState } from 'react';
import Search from "antd/lib/input/Search";
import LastComment from 'pages/Posts/PostsSidebar/LastComment';
import {useAppDispatch} from "redux/reduxStore";
import {actions, getAllPosts} from "redux/postsReducer";
import {postsAPI} from "api/postsAPI";
import Skeleton from 'antd/lib/skeleton/Skeleton';

const PostsSidebar = () => {

    const [tags, setTags] = useState<string[] | undefined>(undefined)

    const dispatch = useAppDispatch()

    useEffect(() => {
        getTags()
    }, [])

    const getTags = async () => {
        const response = await postsAPI.getTags()
        setTags(response)
    }
    const searchPosts = (value:string) => {
        dispatch(getAllPosts(value)).then(() => {
            dispatch(actions.addSearchFilter(value))
        })
    }

    return (
        <div className="searchPost">
            <div className="searchPost__input">
                <Search  placeholder="Поиск по названию, тэгам" allowClear  onSearch={searchPosts}/>
            </div>
            <div className="searchPost__tagBlock">
                <span>Популярные тэги</span>
                <div className="searchPost__tagBlock-tags">
                    {tags ? tags.map((item)=><span>#{item}</span>)
                        : <Skeleton title={false}
                              active paragraph={{ rows: 5, width: ["60%","45%","50%","55%","40%",]}}/>}

                    {/*<Skeleton title={false}
                              active paragraph={{ rows: 5, width: ["60%","45%","50%","55%","40%",]}}/>*/}
                </div>
            </div>
            <div className="searchPost__comments">
                <span className="comments-description">Последние комментарии</span>
                <div className="searchPost__comments-list">
                    <LastComment/>
                    <LastComment/>
                    <LastComment/>
                    <LastComment/>
                </div>
            </div>
        </div>
    );
};

export default PostsSidebar;