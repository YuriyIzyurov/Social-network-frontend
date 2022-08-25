import React, {useState} from 'react';
import "pages/Posts/PostsPage/PostPage.scss"
import {Input} from 'antd';
import {CommentOutlined, EyeOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AddPost from "components/Forms/AddPost";
import classnames from 'classnames';
import EditSettings from "utils/EditSettings/EditSettings";
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// @ts-ignore
import {nightOwl} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {GetMessageTime} from "utils/Time/CustomTime";
// @ts-ignore
import DefaultImage from 'assets/images/defaultPostImage.jpg'

const { TextArea } = Input;
//todo: в один компонент сделать инпут?


type PropsType = {
    id: string,
    imageUrl: string,
    title: string,
    tags: string[],
    text: string,
    viewsCount: number,
    commentsCount: number,
    user: any,
    createdAt: string,
    isEditable: boolean
}
const PostShorten: React.FC<PropsType> = ({id, user, imageUrl, title, tags, text, viewsCount, commentsCount, createdAt,isEditable }) => {

    const [edit, setEdit] = useState(false)
    const [isTooltipVisible, setTooltipVisible] = useState(false)

    const editPost = () => {
        setEdit(!edit)
    }
    const handleTooltipVisibility = (boolean: boolean) => {
        setTooltipVisible(boolean)
    }

    return (
        <>
            {edit ? <AddPost  postHandler={editPost} currentPost={{title, text, tags, imageUrl}} id={id} getPostById={null}/>
                : <div className="postPreview">
                <div className={classnames("postPreview__main", {"postPreview__main-tooltip": isTooltipVisible})}>
                    <Link to={`/posts/${id}`}>
                        <div className="postPreview__main-headerImg">
                            <img src={imageUrl ? imageUrl : DefaultImage} alt='image' />
                        </div>
                    </Link>
                    <div className="postPreview__main-info">
                        <div className="postPreview__main-info-author">
                            <div className="post-avatar">
                                <img src={user.avatarUrl} alt="ava"/>
                            </div>
                            <div className="postAuthor-name">
                                <span>{user.fullName}</span>
                                <span>
                                   <GetMessageTime date={createdAt} showFullDate/>
                                </span>
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
                                <ReactMarkdown children={text}
                                               className="markdown"
                                               components={{
                                                   code({node, inline, className, children, ...props}) {
                                                       const match = /language-(\w+)/.exec(className || '')
                                                       return !inline && match ? (
                                                           <SyntaxHighlighter
                                                               children={String(children).replace(/\n$/, '')}
                                                               style={nightOwl}
                                                               customStyle={{backgroundColor:"#2c2f48", borderRadius:"15px"}}
                                                               language={match[1]}
                                                               PreTag="div"
                                                               {...props}
                                                           />
                                                       ) : (
                                                           <code className={className} {...props}>
                                                               {children}
                                                           </code>
                                                       )
                                                   }
                                               }}
                                />
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
                                    <span>{commentsCount}</span>
                                </div>
                            </div>
                            {isEditable ? <EditSettings editPost={editPost} id={id} handleTooltipVisibility={handleTooltipVisibility}/> : <div></div>}
                        </div>
                    </div>
                </div>
            </div> }
        </>
    );
};

export default PostShorten;