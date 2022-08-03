import React, {useState} from 'react';
import "./PostPage.scss"
import { Button} from 'antd';
import { DownloadOutlined, CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { TextArea } = Input;
//todo: в один компонент сделать инпут?

const PostPage: React.FC = () => {

    const [value, setValue] = useState('');

    return (
        <div className="post">
            <div className="post__main">
                <div className="post__main-headerImg">
                    <img src="https://wallpapershome.ru/images/wallpapers/tuman-3840x2160-4k-hd-les-zelen-rasteniya-577.jpg" alt='les' />
                </div>
                <div className="post__main-info">
                    <div className="post__main-info-author">
                        <div className="post-avatar">
                            <img src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg" alt="ava"/>
                        </div>
                        <div className="name">
                            Юрий Изъюров
                        </div>
                    </div>
                    <div className="post__main-info-title">
                        <h1>Это самый крутой лес на планете</h1>
                    </div>
                    <div className="post__main-info-tags">
                        <span>#лес</span>
                        <span>#природа</span>
                        <span>#свежий воздух</span>
                    </div>
                    <div className="post__main-info-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis consequatur cumque
                            delectus distinctio dolor dolore doloremque earum hic ipsum laborum laudantium nobis,
                            obcaecati, praesentium provident, quam quibusdam repellendus temporibus. Aliquid animi
                            asperiores atque corporis cupiditate debitis dolore dolorum enim eos error, eum ex excepturi
                            hic id ipsa ipsum iste magni minima numquam, odio possimus quae quas qui quibusdam quidem
                            quisquam quos sed, sequi suscipit temporibus ullam vel voluptas voluptatibus! Animi
                            asperiores deleniti dignissimos dolore, laboriosam laborum praesentium qui reprehenderit
                            tempore tenetur? Ab aliquam atque consequatur cupiditate delectus molestias natus nihil
                            perspiciatis, placeat quaerat quia quod temporibus veniam. Assumenda commodi enim explicabo
                            laborum maiores maxime molestias non pariatur repellat voluptatum. Accusantium amet aut
                            corporis doloremque ea eius eos error esse et eum, fugit harum iusto magnam necessitatibus
                            nisi nulla odio odit officia qui quidem quis quisquam quod rem, totam veniam, veritatis vero
                            voluptate. Consequuntur fugit ipsum modi praesentium, quam quos sapiente ullam voluptas.
                            Amet aperiam atque cumque, dicta dolor dolore dolorum ea eum fugit ipsum iste laudantium
                            minima natus nihil, nisi officia officiis omnis porro possimus quaerat quas quidem rem
                            repellat sit tempore veritatis vero voluptatem! Dolorem doloribus ducimus veritatis voluptas
                            voluptatibus? Aperiam illo mollitia quam quia quo tempore voluptates.</p>
                    </div>
                    <div className="post__main-info-views">
                        <div className="views">
                            <span><EyeOutlined /></span>
                            <span>14</span>
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

export default PostPage;