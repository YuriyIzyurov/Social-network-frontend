import React from 'react';
import PostShorten from "pages/Posts/Post/PostShorten/PostShorten";
import {PostType} from "typings/types";
import PostSkeleton from "components/Skeletons/PostSkeleton";
type PropsType = {
    posts:Array<PostType>
    id:string | boolean | null
    isFetching: boolean
}
const PostList:React.FC<PropsType> = ({posts,id, isFetching}) => {


    const SkeletonArray = Array.from({length: posts.length}).map((_,index) => <PostSkeleton key={'skeleton' + index}/>)

    return (
    <>
            {isFetching ?
                SkeletonArray
                : posts.map((item) => <PostShorten
                key={item._id}
                id={item._id}
                imageUrl={item.imageUrl}
                title={item.title}
                tags={item.tags}
                text={item.text}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                isEditable={item.user._id === id}
                />)}
    </>
    );
};

export default PostList;