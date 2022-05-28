import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'
import axios from "axios";
import {followAPI} from "../../api/api";

const UserItem = (props) => {

    return <div>
        <NavLink to={"/profile/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.photo !== null ? props.photo : userDefaultPhoto }/>

            <div>{props.name}</div>
        </NavLink>
            {!props.followed
                ? <button onClick={()=>{followAPI.followUser(props.id).then(data => {
                    if(data.resultCode === 0)
                        props.pushFollow(props.id)})}}>FOLLOW</button>
                : <button onClick={()=>{followAPI.unFollowUser(props.id).then(data => {
                    if(data.resultCode === 0)
                        props.pushFollow(props.id)})}}>UNFOLLOW</button>}
           <div>{props.status}</div>

    </div>
}

export default UserItem