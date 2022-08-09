import React, {useState} from 'react';
import "./PostPage.scss"
import {Tooltip, Input, Popover} from 'antd';
import {CommentOutlined, FormOutlined, EyeOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AddPost from "../../components/Profile/MyPosts/AddPost";
import classnames from 'classnames';

const { TextArea } = Input;
//todo: в один компонент сделать инпут?


type PropsType = {
    id: string,
    imageUrl: string,
    title: string,
    tags: string[],
    text: string,
    viewsCount: number,
    user: any,
    createdAt: string,
    isEditable: boolean
}
const PostShorten: React.FC<PropsType> = ({id, user, imageUrl, title, tags, text, viewsCount, createdAt,isEditable }) => {

    const [edit, setEdit] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleEditTooltip, setVisibleEditTooltip] = useState(false)
    const [visibleDeleteTooltip, setVisibleDeleteTooltip] = useState(false)


    const editPost = () => {
        setEdit(!edit)
    }
    const handleVisibleChange = (newVisible: boolean) => {
        setVisibleDeleteTooltip(false)
        setVisible(newVisible)
    }
    const hide = () => {
        setVisible(false)
    }
    const showEditTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleEditTooltip(newVisible)
    }
    const showDeleteTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleDeleteTooltip(newVisible)
    }


    return (
        <>
            {edit ? <AddPost  postHandler={editPost} currentPost={{title, text, tags, imageUrl}} id={id}/>
                : <div className="postPreview">
                <div className={classnames("postPreview__main", {"postPreview__main-tooltip": visible || visibleEditTooltip || visibleDeleteTooltip})}>
                    <Link to={`/posts/${id}`}>
                        <div className="postPreview__main-headerImg">
                            <img src={imageUrl} alt='les' />
                        </div>
                    </Link>
                    <div className="postPreview__main-info">
                        <div className="postPreview__main-info-author">
                            <div className="post-avatar">
                                <img src={user.avatarUrl} alt="ava"/>
                            </div>
                            <div className="postAuthor-name">
                                <span>{user.fullName}</span>
                                <span>{createdAt}</span>
                            </div>
                        </div>
                        <Link to={`/posts/${id}`}>
                            <div className="postPreview__main-info-title">
                                <h1>{title}</h1>
                            </div>
                            <div className="postPreview__main-info-tags">
                                {tags.map((item) => <span>#{item}</span>)}
                            </div>
                            <div className="postPreview__main-info-text">
                                <ReactMarkdown children={text} />
                            </div>
                        </Link>
                        <div className="postPreview__main-info-views">
                            <div style={{display:"flex",alignItems: "center"}}>
                                <div className="views">
                                    <span><EyeOutlined /></span>
                                    <span>{viewsCount}</span>
                                </div>
                                <div className="comments">
                                    <span><CommentOutlined /></span>
                                    <span>3</span>
                                </div>
                            </div>
                            {isEditable ? <div className="edit">
                                <Tooltip mouseLeaveDelay={0.05}
                                         mouseEnterDelay={0.3}
                                         visible={visibleEditTooltip}
                                         onVisibleChange={showEditTooltip}
                                         title="Редактировать пост"
                                >
                                    <FormOutlined onClick={editPost}/>
                                </Tooltip>
                                <Tooltip mouseLeaveDelay={0.05}
                                         mouseEnterDelay={0.3}
                                         visible={visibleDeleteTooltip}
                                         onVisibleChange={showDeleteTooltip}
                                         title="Удалить пост">
                                    <Popover
                                        content={<a onClick={hide}>Close</a>}
                                        title="Вы действительно хотите удалить пост?"
                                        trigger="click"
                                        visible={visible}
                                        onVisibleChange={handleVisibleChange}
                                        color={"#2c2f48"}
                                        overlayClassName="custom-popover"
                                    >
                                        <DeleteOutlined  style={{color: 'red'}}/>
                                    </Popover>
                                </Tooltip>
                            </div> : <div></div>}
                        </div>
                    </div>
                </div>
            </div> }
        </>
    );
};

export default PostShorten;