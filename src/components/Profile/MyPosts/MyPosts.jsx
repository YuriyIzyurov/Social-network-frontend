import React from "react"
import s from './MyPosts.module.css'

const MyPosts = (props) => {

    let submitPost = () => {
        props.addPost()
    }

   let changeArea = (onChange) => {
        props.addNewSymbol(onChange.target.value)
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