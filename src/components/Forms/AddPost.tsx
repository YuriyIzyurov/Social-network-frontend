import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {Button, Divider, Input} from "antd";
import {actions, publicPost} from "redux/postsReducer";
import {postsAPI} from "api/postsAPI";
import {useAppDispatch} from "redux/reduxStore";
import SimpleMDERedactor from 'SimpleMDERedactor';
import {AddPostType} from "typings/types";
import {useDispatch, useSelector} from "react-redux";
import {getPostID} from "redux/post-selectors";
import {useNavigate, useParams} from "react-router";

const {TextArea} = Input



type PropsType = {
    postHandler: () => void
    currentPost: null | AddPostType
    id: null | string
    getPostById:  (() => void) | null
}


const AddPost: React.FC<PropsType> = ({postHandler, currentPost,id, getPostById}) => {

    const [imageUrl, setImageUrl] = useState(``)
    const [title, setTitle] = useState(``)
    const [tags, setTags] = useState([] as string[])
    const [text, setText] = useState(``)

    const inputImgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const postId = useSelector(getPostID)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if(params.id && postId && getPostById) {
            getPostById()
            dispatch(actions.deleteCreatedPostId())
            postHandler()
        }
         if(postId) {
            navigate(`/posts/${postId}`)
            dispatch(actions.deleteCreatedPostId())
        }
    },[postId])

    useEffect(() => {
        if(currentPost) {
            const {imageUrl, title, tags, text} = currentPost
            setImageUrl(imageUrl as string)
            setTitle(title)
            setTags(tags)
            setText(text)
        }
    },[])

    const sendNewPost = () => {
        if(currentPost) {
            dispatch(publicPost({title, tags, text, imageUrl}, id))
        } else {
            dispatch(publicPost({title, tags, text, imageUrl}))
        }
    }
    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const response = await postsAPI.uploadPreview(e.target.files[0])
            const imageUrl = `http://localhost:4444${response.url}`
            setImageUrl(imageUrl)
        }
    }
    const makeArrayOfTags = (e: ChangeEvent<HTMLInputElement>) => {

        const tags = e.currentTarget.value.split(',')
        setTags(tags)
    }
    const handleSetText = useCallback((value: string) => {
        setText(value)
    }, [])

    return (
        <div style={{position: currentPost ? "unset" : "absolute"}} className="profile__posts-adding">
            <div className="profile__posts-adding-preview">
                <Button size="large" onClick={() => inputImgRef.current?.click()}>Загрузить превью</Button>
                    <input name='image'
                           type='file'
                           onChange={handleFile}
                           ref={inputImgRef}
                           hidden/>
                {imageUrl && <Button size="large" onClick={() => setImageUrl('')}>Удалить</Button>}
            </div>
            {imageUrl && <div>
                <img style={{height: "300px", width: "350px"}} src={imageUrl} alt='preview'/>
            </div>}
            <div className="profile__posts-adding-inputs">
                <Divider orientation="left" orientationMargin={0} plain>
                    Заголовок
                </Divider>
                    <Input name='title'
                           value={title}
                           onChange={(e) => {setTitle(e.currentTarget.value)}}
                           placeholder="Введите заголовок статьи"/>
                <Divider orientation="left" orientationMargin={0} plain>
                    Тэги
                </Divider>
                    <Input name='tags'
                           value={tags}
                           onChange={makeArrayOfTags}
                           placeholder="Введите тэги через запятую"/>
                <Divider orientation="left" orientationMargin={0} plain>
                    Пост
                </Divider>
                <SimpleMDERedactor handleSetText={handleSetText} text={text}/>
            </div>
            <div className="profile__posts-adding-buttons">
                    <Button onClick={sendNewPost} type="primary" size="large">
                        Опубликовать
                    </Button>
                <Button onClick={postHandler} size="large">Отмена</Button>
            </div>
        </div>
    );
};
export default AddPost