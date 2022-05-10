import React from "react"
import s from './MyPosts.module.css'

const MyPosts = (props) => {
    let newPost = React.createRef()
    let submitPost = () => {
        props.addPost(newPost.current.value)
        props.addNewSymbol('')
    }
   let changeArea = () => {
        props.addNewSymbol(newPost.current.value)
    }

    return <div className='content'>
        <div>
            my post
            <div>
                <div>
                    <textarea onChange={changeArea} ref={newPost} value={props.textArea}/>
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