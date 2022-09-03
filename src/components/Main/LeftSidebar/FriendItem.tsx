import React from 'react';
import { NavLink } from 'react-router-dom';
import {UserType} from "typings/types";


export const FriendItem = ({item}:{item: UserType}) => {
    return (
        <NavLink to={"/profile/" + item.id}>
        <div className="friends__list-item list-item-card">
            <div className="clip-avatar">
                <img style={{width:"44px", height:"44px"}} src={item.photos.small} alt='ava'/>
            </div>
            <div className="friends__list-item-name">
                <span>{item.name}</span>
                <span>{item.status}</span>
            </div>
        </div>
        </NavLink>
    );
};
