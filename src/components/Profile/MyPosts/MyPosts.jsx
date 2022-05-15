import React from "react"
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    const post = props.messagesData.map(m=><Post message={m.post} likesCount={m.likesCount} />)
    let submitPost = () => {
        props.submitNewPost()
    }
   let changeArea = (onChange) => {
       debugger
        props.addNewSym(onChange.target.value)
    }
    return <div className='content'>
        <div>
            my post
            <div>
                <div>
                    <textarea onChange={changeArea} value={props.textArea}/>
                </div>
                <div>
                    <button onClick={submitPost}>Add post</button>
                </div>
            </div>
        </div>
        <div className={s.posts}>
            {post}
        </div>
    </div>

}

export default MyPosts