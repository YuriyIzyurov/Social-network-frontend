import React from 'react';
import Search from "antd/lib/input/Search";
import LastComment from 'pages/Posts/PostsSidebar/LastComment';

const PostsSidebar = () => {
    return (
        <div className="searchPost">
            <div className="searchPost__input">
                <Search  placeholder="Поиск среди контактов" allowClear onChange={() => console.log('qu')} />
            </div>
            <div className="searchPost__tagBlock">
                <span>Популярные тэги</span>
                <div className="searchPost__tagBlock-tags">
                    <span>#реакт</span>
                    <span>#js</span>
                    <span>#web</span>
                    <span>#компоненты</span>
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