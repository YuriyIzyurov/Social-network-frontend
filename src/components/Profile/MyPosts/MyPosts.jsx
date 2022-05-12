import React from "react"
import s from './MyPosts.module.css'

const MyPosts = (props) => {

    let submitPost = () => {
        props.dispatch({type:"ADD-POST"})
    }

   let changeArea = (onChange) => {
        props.dispatch({type:"ADD-SYMBOL-POST", newText: onChange.target.value})
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

        </div>
    </div>

}

export default MyPosts