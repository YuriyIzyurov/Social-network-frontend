import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'
import Paginator from "./Paginator";



const Users = ({totalUsers, usersOnPage, activePage, getUsersOnPage, users, handlingFollowAction, handlingUnfollowAction, followInProcess }) => {
    return (
        <div>
            <Paginator totalUsers={totalUsers}
                       usersOnPage={usersOnPage}
                       activePage={activePage}
                       getUsersOnPage={getUsersOnPage}/>
            <div className={s.user}>
                {users.map(u => <UserItem user={u}
                                          key={u.id}
                                          handlingFollowAction={handlingFollowAction}
                                          handlingUnfollowAction={handlingUnfollowAction}
                                          followInProcess={followInProcess}
                />)}
            </div>
        </div>
    )
}
export default Users
