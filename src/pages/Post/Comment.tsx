import React from 'react';
import {CommentsType} from "../../typings/types";
import './Comment.scss'
import {GetMessageTime} from "../../utils/Time/CustomTime";

const Comment:React.FC<{item:CommentsType}> = ({item}) => {
    return (
        <div className="post__comments-commentWrapper">
            <div className="post-comment">
                <div className="post-avatar">
                    <img src={item.user.avatarUrl} alt='ava'/>
                </div>
                <div className="nameAndText">
                    <span>{item.user.fullName}</span>
                    <span>{item.text}</span>
                    <span><GetMessageTime date={item.createdAt} showFullDate/></span>
                </div>
            </div>
        </div>
    );
};

export default Comment;