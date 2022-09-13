import React from 'react';
import {UserType} from "typings/types";
import {NavLink} from "react-router-dom";
import {GradientCharAvatar} from "components/CustomAvatars";

export const FriendItemShort = ({item}:{item: UserType}) => {

    return (
        <NavLink to={"/profile/" + item.id}>
            <div className="friends__list-short-item">
                <div className="friends__list-short-item-avatar">
                    <GradientCharAvatar avatarUrl={item.photos.small} name={item.name}/>
                </div>
            </div>
        </NavLink>
    );
};
