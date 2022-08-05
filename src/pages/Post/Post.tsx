import React, {useEffect, useState} from 'react';
import "./PostPage.scss"
import { Button} from 'antd';
import { DownloadOutlined, CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { TextArea } = Input;
//todo: в один компонент сделать инпут?


type PropsType = {
    imageUrl: string,
    title: string,
    tags: string[],
    text: string,
    viewsCount: number,
    user: any
}
const Post: React.FC<PropsType> = ({user, imageUrl, title, tags, text, viewsCount }) => {

    const [value, setValue] = useState('');

    return (
        <div className="post">
            <div className="post__main">
                <div className="post__main-headerImg">
                    <img src={imageUrl} alt='les' />
                </div>
                <div className="post__main-info">
                    <div className="post__main-info-author">
                        <div className="post-avatar">
                            <img src={user.avatarUrl} alt="ava"/>
                        </div>
                        <div className="name">
                            {user.fullName}
                        </div>
                    </div>
                    <div className="post__main-info-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="post__main-info-tags">
                        <span>#{tags[0]}</span>
                        <span>#{tags[1]}</span>
                        <span>#{tags[2]}</span>
                    </div>
                    <div className="post__main-info-text">
                        <p>{text}</p>
                    </div>
                    <div className="post__main-info-views">
                        <div className="views">
                            <span><EyeOutlined /></span>
                            <span>{viewsCount}</span>
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

export default Post;