/*
import React from "react"
import './Users.scss'
import {Link, NavLink} from "react-router-dom";
import Avatar from "../DialogsPage/DialogItem/Avatar";
import {UserType} from "../../typings/types";
// @ts-ignore
import {customAvatar} from "../../utils/Avatar/AvatarGenerator";

type PropsType = {
    user: UserType
    followInProcess: Array<number>
    handlingFollow: (user: number) => void
    handlingUnfollow: (user: number) => void
}
const UserItem: React.FC<PropsType> = React.memo(({user, followInProcess, handlingFollow, handlingUnfollow}) => {

    return <div>
        <Link to={`/profile/${user.id}`} >
            <Avatar user={user}/>
            <div>{user.name}</div>
        </Link>
            {!user.followed
                ? <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingFollow(user.id)

                    }}>FOLLOW</button>
                : <button disabled={followInProcess.some(item => item === user.id)} onClick={()=>{
                    handlingUnfollow(user.id)
                }}>UNFOLLOW</button>}
           <div>{user.status}</div>

    </div>
})
export default UserItem*/
