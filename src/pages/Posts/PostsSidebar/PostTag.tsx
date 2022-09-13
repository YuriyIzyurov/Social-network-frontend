import React from 'react'

export const PostTag = ({item, getPostsWithTag}:{item:string, getPostsWithTag:(item:string) => void}) => {

    return (
        <li className='tagList-item' onClick={() => getPostsWithTag(item)}>
            #{item}
        </li>
    )
}
