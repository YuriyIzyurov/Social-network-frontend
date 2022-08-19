import React from 'react';
import {Link} from "react-router-dom";
import {PostType} from "typings/types";

const PublicationShort = ({item}:{item: PostType}) => {
    return (
        <div className="publication">
            <Link to={`/posts/${item._id}`}>
                <img src={item.imageUrl} alt='forest'/>
                <div className="publication__glass">
                    <h2>{item.title}</h2>
                    <p>{item.tags.map((item)=><span>#{item}</span>)}</p>
                </div>
            </Link>
        </div>
    );
};

export default PublicationShort;