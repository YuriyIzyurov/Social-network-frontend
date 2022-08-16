import React from 'react';

const LastComment = () => {
    return (
        <div className="searchPost__comments-list-item">
            <div className="searchPost__comments-list-item-avatar">
                <img style={{width:"44px", height:"44px"}} src="https://illustrators.ru/uploads/illustration/image/1400706/invisible2.jpg" alt='ava'/>
            </div>
            <div className="searchPost__comments-list-item-name">
                <div className="headerOf-comment">
                    <span>Yuriy Izyurov</span>
                    <span>13 августа 23:34</span>
                </div>
                <span>You can stream query results from MongoDB. You need to call the Query#cursor() function to return an instance of QueryCursor.</span>
            </div>
        </div>
    );
};

export default LastComment;