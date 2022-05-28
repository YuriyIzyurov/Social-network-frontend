import React from "react"
import s from './Users.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import userDefaultPhoto from '../../assets/images/personal-user.png'
import {followAPI} from "../../api/api";

const UserItem = (props) => {

    return <div>
        <NavLink to={"/profile/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.photo !== null ? props.photo : userDefaultPhoto }/>

            <div>{props.name}</div>
        </NavLink>
            {!props.followed
                ? <button disabled={props.followInProcess.some(id => id === props.id)} onClick={()=>{
                    props.setFollowInProcess(true, props.id)
                    followAPI.followUser(props.id).then(data => {
                    if(data.resultCode === 0){
                        props.pushFollow(props.id)
                    }
                        props.setFollowInProcess(false, props.id)})
                    }}>FOLLOW</button>
                : <button disabled={props.followInProcess.some(id => id === props.id)} onClick={()=>{
                    props.setFollowInProcess(true, props.id)
                    followAPI.unFollowUser(props.id).then(data => {
                    if(data.resultCode === 0){
                        props.pushFollow(props.id)
                    }
                        props.setFollowInProcess(false, props.id)})
                }}>UNFOLLOW</button>}
           <div>{props.status}</div>

    </div>
}

export default UserItem