import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'
import axios from "axios";

const Users = (props) => {
    if(props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users?page=7").then(response=>{
            props.showUsers(response.data.items)
        })

    }
    let userList = props.users.map(n=> <UserItem name={n.name}
                                                id={n.id}
                                                photo={n.photos.large}
                                                followed={n.followed}
                                                status={n.status}
                                                pushFollow={props.pushFollow}
    />)

    return (
        <div>
            <div className={s.user}>
                {userList}
            </div>
        </div>
    )
}

export default Users
