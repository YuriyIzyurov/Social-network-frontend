import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'

const Users = (props) => {

    let userList = props.users.map(n=> <UserItem name={n.name}
                                                id={n.id}
                                                src={n.src}
                                                followed={n.followed}
                                                status={n.status}
                                                location={n.location}/>)
    return (
        <div>
            <div className={s.user}>
                {userList}
            </div>
        </div>
    )
}

export default Users
