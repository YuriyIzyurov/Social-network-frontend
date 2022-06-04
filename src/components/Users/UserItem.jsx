import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'


const UserItem = ({user, followInProcess, handlingFollowAction, handlingUnfollowAction}) => {

    return <div>
        <NavLink to={"/profile/" + user.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={user.photos.large !== null ? user.photos.large : userDefaultPhoto }/>
            <div>{user.name}</div>
        </NavLink>
            {!user.followed
                ? <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingFollowAction(user.id)

                    }}>FOLLOW</button>
                : <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingUnfollowAction(user.id)
                }}>UNFOLLOW</button>}
           <div>{user.status}</div>

    </div>
}

export default UserItem