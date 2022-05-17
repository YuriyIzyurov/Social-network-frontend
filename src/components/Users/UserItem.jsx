import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";

const UserItem = (props) => {

    let followUser = () => {
        props.pushFollow(props.id)
    }
    return <div>
        <NavLink to={"/users/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.src}/>
            <div>{props.name}</div>
            <button onClick={followUser}>{props.followed}</button>
        </NavLink>
    </div>
}

export default UserItem