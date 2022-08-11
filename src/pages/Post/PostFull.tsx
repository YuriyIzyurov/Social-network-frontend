import React, {useEffect, useState} from 'react';
import "./PostFull.scss"
import { Button} from 'antd';
import { DownloadOutlined, CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {postsAPI} from "../../api/postsAPI";
import {PostType} from "../../typings/types";
import Preloader from "../../common/Preloader/Preloader";
import ReactMarkdown from 'react-markdown';
import {useSelector} from "react-redux";
import {getBloggerID, getMe} from "../../redux/auth-selectors";
import EditSettings from "../../utils/EditSettings/EditSettings";
import AddPost from "../../components/Profile/MyPosts/AddPost";
const { TextArea } = Input;
//todo: в один компонент сделать инпут?



const PostFull = () => {

    const [value, setValue] = useState('');
    const [edit, setEdit] = useState(false)
    const [isTooltipVisible, setTooltipVisible] = useState(false)
    const [post, setPost] = useState<PostType | undefined>(undefined);
    const id = useSelector(getBloggerID)
    const params = useParams()

    const getPostById = async () => {
        const response = await postsAPI.getPostById(params.id)
        setPost(response)
    }
    useEffect(() => {
        getPostById().then(() =>{
            console.log("success")
        })
    }, [])

    const editPost = () => {
        setEdit(!edit)
    }
    const handleTooltipVisibility = (boolean: boolean) => {
        setTooltipVisible(boolean)
    }

    if(!post) {
        return <Preloader/>
    }
    if(edit) {
        const {title, text, tags, imageUrl} = post
        return  <AddPost  postHandler={editPost} currentPost={{title, text, tags, imageUrl}} id={post._id} getPostById={getPostById} />
    }
    return (
        <div className="post">
            <div className="post__main">
                    <div className="post__main-headerImg">
                        <img src={post.imageUrl} alt='image'/>
                    </div>
                    <div className="post__main-info">
                        <div className="post__main-info-author">
                            <div style={{display: "flex"}}>
                                <div className="post-avatar">
                                    <img src={post.user.avatarUrl} alt="User"/>
                                </div>
                                <div className="name">
                                    <span>{post.user.fullName}</span>
                                    <span>{post.createdAt}</span>
                                </div>
                            </div>
                            {id === post.user._id && <EditSettings editPost={editPost} id={post._id}
                                           handleTooltipVisibility={handleTooltipVisibility}/>}
                        </div>
                        <div className="post__main-info-title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="post__main-info-tags">
                            {post.tags.map((item) => <span>#{item}</span> )}
                        </div>
                        <div className="post__main-info-text">
                            <ReactMarkdown children={post.text} />
                        </div>
                        <div className="post__main-info-views">
                            <div className="views">
                                <span><EyeOutlined /></span>
                                <span>{post.viewsCount}</span>
                            </div>
                            <div className="comments">
                                <span><CommentOutlined /></span>
                                <span>3</span>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="post__comments">
                <div className="post__comments-explanation">Комментарии</div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-comment">
                    <div className="post-avatar">
                        <img src="https://klike.net/uploads/posts/2019-03/1551511801_1.jpg" alt='ava'/>
                    </div>
                    <div className="nameAndText">
                        <span>Дмитрий Иванов</span>
                        <span>Да вообще ни о о чем этот текст. Не понравилось, давай другое</span>
                    </div>
                </div>
                <div className="post__comments-textarea">
                    <div className="post-avatar">
                        <img src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg" alt="ava"/>
                    </div>
                    <div className="input">
                        <TextArea
                            className="message__form-textarea"
                            size="small"
                            placeholder="Введите текст сообщения..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="sendButton">
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size='large'>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostFull;