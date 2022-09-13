import React from 'react';
import { Link } from 'react-router-dom';
import {CommentsType} from "typings/types";
import {GetMessageTime} from "utils/Time/CustomTime";

export const LastComment = ({item}:{item:CommentsType}) => {
    return (
        <Link to={`/posts/${item.post}`} state={{scrollToBottom: true}}>
        <div className="searchPost__comments-list-item  common-card-animation">
            <div style={{width:'52px'}} className="clip-comment-avatar">
                <img  src={item.user.avatarUrl} alt='ava'/>
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
        </Link>
    );
};
