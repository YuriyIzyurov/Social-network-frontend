import React from 'react';
import {Link} from "react-router-dom";
import {PostType} from "typings/types";
// @ts-ignore
import DefaultImage from 'assets/images/defaultPostImage.jpg'

const PublicationShort = ({item}:{item: PostType}) => {
    return (
        <div className="publication">
            <Link to={`/posts/${item._id}`}>
                    <img src={item.imageUrl ? item.imageUrl : DefaultImage} alt='image'/>
                <div className="publication__glass">
                    <h2>{item.title}</h2>
                    <p>{item.tags.map((item)=><Tag key={'tag-' + item} item={item}/>)}</p>
                </div>
            </Link>
        </div>
    );
};



export const Tag = ({item}:{item:string}) => {
    return (
        <span>#{item}</span>
    );
};



export default PublicationShort;