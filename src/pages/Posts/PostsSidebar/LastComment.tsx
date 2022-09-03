import React from 'react';
import {CommentsType} from "typings/types";
import {GetMessageTime} from "utils/Time/CustomTime";

const LastComment = ({item}:{item:CommentsType}) => {
    return (
        <div className="searchPost__comments-list-item list-item-card">
            <div className="clip-avatar">
                <img style={{width:"44px", height:"44px"}} src={item.user.avatarUrl} alt='ava'/>
            </div>
            <div className="searchPost__comments-list-item-name">
                <div className="headerOf-comment">
                    <span>{item.user.fullName}</span>
                    <span>
                        <GetMessageTime date={item.createdAt} showFullDate/>
                    </span>
                </div>
                <span>{item.text}</span>
            </div>
        </div>
    );
};

export default LastComment;