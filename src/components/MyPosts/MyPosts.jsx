import React from "react"
import s from './MyPosts.module.css'

const MyPosts = () =>{
    return <div className='content'>
            <div>
                my post
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>

            </div>
        </div>

}

export default MyPosts