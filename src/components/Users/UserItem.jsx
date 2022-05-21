import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'

const UserItem = (props) => {

    return <div>
        <NavLink to={"/users/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.photo !== null ? props.photo : userDefaultPhoto }/>

            <div>{props.name}</div>
        </NavLink>
            {props.followed === false ?<button onClick={()=>{props.pushFollow(props.id)}}>FOLLOW</button> : <button onClick={()=>{props.pushFollow(props.id)}}>UNFOLLOW</button>}
           <div>{props.status}</div>

    </div>
}

export default UserItem