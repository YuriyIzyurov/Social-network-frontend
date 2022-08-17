import React, {useEffect, useState} from "react"
import 'pages/Posts/ProfilePage/ProfilePosts.scss'
import {MessagesDataType} from "typings/types";
import banner from "assets/images/Banner.png"
import {FormOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import AddPost from "components/Forms/AddPost";
import {useParams} from "react-router";





const ProfilePosts = () => {

    const [isPostAdding, setPostAdding] = useState(false);
    const params = useParams()
    useEffect(() => {
        console.log('posts mount')
    },[])

    const postHandler = () => {
        setPostAdding(!isPostAdding)
    }
    let id

    return  (
        <div className="profile__posts">
            <div className="profile__posts-animation">
                <img src={banner} alt='banner'/>
            </div>
            <div className="profile__posts-recommended">
                <div className="description">
                    <span>Featured</span>
                    <span>See all</span>
                </div>
            </div>
            <div className="profile__posts-publications">
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://assets.unenvironment.org/decadeonrestoration/2020-03/nature-3294681_1280%20%281%29.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt ut lacreet dolore.</p>
                    </div>
                    </Link>
                </div>
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://bipbap.ru/wp-content/uploads/2018/04/00000_3-640x426.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt utt.</p>
                    </div>
                    </Link>
                </div>
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://shkolnaiapora.ru/wp-content/uploads/2019/03/%D0%9F%D1%83%D1%81%D1%82%D1%8B%D0%BD%D1%8F-%D0%A1%D0%B0%D1%85%D0%B0%D1%80%D0%B0.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh.</p>
                    </div>
                    </Link>
                </div>
            </div>
            <div className="profile__posts-mine">
                <div className="description">
                    <span>My posts</span>
                    <span onClick={postHandler}><FormOutlined /></span>
                </div>
            </div>
            <div className="profile__posts-publications">
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://assets.unenvironment.org/decadeonrestoration/2020-03/nature-3294681_1280%20%281%29.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt ut lacreet dolore.</p>
                    </div>
                    </Link>
                </div>
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://bipbap.ru/wp-content/uploads/2018/04/00000_3-640x426.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh euismod tincidunt utt.</p>
                    </div>
                    </Link>
                </div>
                <div className="publication">
                    <Link to={`/post/${id}`}>
                    <img src='https://shkolnaiapora.ru/wp-content/uploads/2019/03/%D0%9F%D1%83%D1%81%D1%82%D1%8B%D0%BD%D1%8F-%D0%A1%D0%B0%D1%85%D0%B0%D1%80%D0%B0.jpg' alt='forest'/>
                    <div className="publication__glass">
                        <h2>Lorem ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem
                            nonummy nibh.</p>
                    </div>
                    </Link>
                </div>
            </div>
            {isPostAdding && <AddPost  postHandler={postHandler} currentPost={null} id={null} getPostById={null}/>}
        </div>
    )


}

export default ProfilePosts