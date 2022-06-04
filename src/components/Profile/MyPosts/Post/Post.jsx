import React from "react"
import s from './Post.module.css'

const Post = ({message, likesCount}) => {

    return <div>
        <div className={s.item}>
            <img src='https://www.meme-arsenal.com/memes/e6adac8c2b0d7958ff9fa0964cf49a6d.jpg'/>
            {message}
            <div>
                <span>{likesCount}</span>
                <span>Like</span>
            </div>
        </div>
    </div>

}

export default Post