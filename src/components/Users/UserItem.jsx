import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'
import axios from "axios";

const UserItem = (props) => {

    return <div>
        <NavLink to={"/profile/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.photo !== null ? props.photo : userDefaultPhoto }/>

            <div>{props.name}</div>
        </NavLink>
            {!props.followed
                ? <button onClick={()=>{axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {},{
                    withCredentials: true,
                    headers: {
                        "API-KEY": "fd4ca5d8-d6c6-4455-a6f0-9223d3ba2b4d"
                    }
                }).then(response => {
                    if(response.data.resultCode === 0)
                        props.pushFollow(props.id)})}}>FOLLOW</button>
                : <button onClick={()=>{axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`,{withCredentials: true}).then(response => {
                    if(response.data.resultCode === 0)
                        props.pushFollow(props.id)})}}>UNFOLLOW</button>}
           <div>{props.status}</div>

    </div>
}

export default UserItem