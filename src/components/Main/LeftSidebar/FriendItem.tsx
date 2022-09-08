import React from 'react';
import { NavLink } from 'react-router-dom';
import {UserType} from "typings/types";
import GradientCharAvatar from "components/CustomAvatars/GradientCharAvatar";


export const FriendItem = ({item}:{item: UserType}) => {
    return (
        <NavLink to={"/profile/" + item.id}>
        <div className="friends__list-item list-item-card common-card-animation">
            <div className="clip-avatar">
                <GradientCharAvatar avatarUrl={item.photos.small} name={item.name}/>
            </div>
            <div className="friends__list-item-name">
                <span>{item.name}</span>
                {item.status && <span>{item.status}</span>}
            </div>
        </div>
        </NavLink>
    );
};
