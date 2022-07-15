import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'
import {UserType} from "../../typings/types";
// @ts-ignore
import {customAvatar} from "../../utils/Avatar/AvatarGenerator";

type PropsType = {
    user: UserType
    followInProcess: Array<number>
    handlingFollow: (user: number) => void
    handlingUnfollow: (user: number) => void
}
const UserItem: React.FC<PropsType> = ({user, followInProcess, handlingFollow, handlingUnfollow}) => {

    return <div>
        <NavLink to={"/profile/" + user.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar user={user}/>
            <div>{user.name}</div>
        </NavLink>
            {!user.followed
                ? <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingFollow(user.id)

                    }}>FOLLOW</button>
                : <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingUnfollow(user.id)
                }}>UNFOLLOW</button>}
           <div>{user.status}</div>

    </div>
}

export default UserItem