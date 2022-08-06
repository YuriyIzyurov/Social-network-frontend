import React, {ChangeEvent, ChangeEventHandler, SetStateAction, useRef, useState} from 'react';
import {Button, Divider, Input} from "antd";
import {FormikProps, withFormik} from "formik";
import {ThunkBlogType} from "../../../redux/authBlogReducer";
import {publicPost, ThunkType} from "../../../redux/postsReducer";
import {AddPostType} from "../../../typings/types";
import {postsAPI} from "../../../api/postsAPI";
import {useAppDispatch} from "../../../redux/reduxStore";
import SimpleMDE from 'simplemde'

const {TextArea} = Input


//const simpleMDE = new SimpleMDE()

type PropsType = {
    postHandler: () => void
}


const AddPost: React.FC<PropsType> = ({postHandler}) => {

    const [imageUrl, setImageUrl] = useState(``)
    const [title, setTitle] = useState(``)
    const [tags, setTags] = useState([] as string[])
    const [text, setText] = useState(``)

    const inputImgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const sendNewPost = () => {
        dispatch(publicPost({title, tags, text, imageUrl}))
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


    return (
        <div className="profile__posts-adding">
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
                <img src={imageUrl} alt='preview'/>
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
                    <TextArea name='text'
                              value={text}
                              onChange={(e) => {setText(e.currentTarget.value)}}
                              rows={15}
                              />
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