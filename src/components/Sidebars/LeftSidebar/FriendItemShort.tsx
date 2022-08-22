import React from 'react';
import {UserType} from "typings/types";
import {Link, NavLink} from "react-router-dom";

const FriendItemShort = ({item}:{item: UserType}) => {

    return (
        <NavLink to={"/profile/" + item.id}>
        <div className="friends__list-short-item">
            <div className="friends__list-short-item-avatar">
                <img style={{width: "44px", height: "44px"}}
                     src={item.photos.small}
                     alt='ava'/>
            </div>
        </div>
        </NavLink>
    );
};

export default FriendItemShort;