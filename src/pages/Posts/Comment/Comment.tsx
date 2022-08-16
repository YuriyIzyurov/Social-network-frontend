import React, {Dispatch, MouseEventHandler, SetStateAction, useState} from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {CommentsType} from "typings/types";
import 'pages/Posts/Comment/Comment.scss'
import {GetMessageTime} from "utils/Time/CustomTime";
import {commentsAPI} from "api/postsAPI";
import {isCommentEditable} from "utils/Time/isCommentEditable";

const { TextArea} = Input

type PropsType = {
    item:CommentsType
    bloggerId:string | null
    getCommentsOfPost: () => void
}
const Comment:React.FC<PropsType> = ({item, bloggerId, getCommentsOfPost}) => {

    const [isEditableComment, editComment] = useState(false)
    const [value, setValue] = useState('')

    const handleDeleteComment = async () => {
        const response = await commentsAPI.deleteComment(item._id)
        if(response.resultCode === 0) {
            getCommentsOfPost()
        }
    }
    const handleEditComment = () => {
        editComment(!isEditableComment)
        if(isEditableComment) {
            setValue('')
        } else setValue(item.text)
    }
    const handleSendEditComment = async () => {
        const response = await commentsAPI.updateComment(value, item._id)
        if(response.resultCode === 0) {
            setValue('')
            getCommentsOfPost()
            editComment(!isEditableComment)
        } else console.log('Что-то пошло не так')
    }
    const editConditions = bloggerId === item.user._id && !isEditableComment && isCommentEditable(item.createdAt)

    return (
        <div className="post__comments-commentWrapper">
            <div className="post-comment">
                <div className="post-avatar">
                    <img src={item.user.avatarUrl} alt='ava'/>
                </div>
                <div className="nameAndText">
                    <div className="headerOf-comment">
                        {item.user.fullName}
                        {editConditions && <div>
                            <EditOutlined onClick={handleEditComment}/>
                            <CloseOutlined onClick={handleDeleteComment}/>
                        </div>}
                    </div>
                    {isEditableComment ? <div className="input">
                        <TextArea
                            className="message__form-textarea"
                            size="small"
                            placeholder="Введите текст комментария..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                        : <span>{item.text}</span>}
                    <div className='footerOf-comment'>
                        <span>
                            <GetMessageTime date={item.updatedAt} showFullDate/>
                        </span>
                        {isEditableComment && <div className='footerOf-comment-options'>
                            <span onClick={handleSendEditComment}>Сохранить</span>
                            <span onClick={handleEditComment}>Отмена</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;