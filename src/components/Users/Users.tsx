import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'
import Paginator from "./Paginator";
import {UserType} from "../../typings/types";
import UserSearchForm from "./UserSearchform";
import {FilterType} from "../../redux/usersReducer";

type PropsType = {
    totalUsers: number
    usersOnPage: number
    activePage: number
    getUsersOnPage: (n:number) => void
    users: Array<UserType>
    handlingFollowAction: (user: number) => void
    handlingUnfollowAction: (user: number) => void
    followInProcess: Array<number>
    handlingFilteredUsers: (filter:FilterType) => void
}

const Users: React.FC<PropsType> = ({totalUsers, handlingFilteredUsers, usersOnPage, activePage, getUsersOnPage, users, handlingFollowAction, handlingUnfollowAction, followInProcess }) => {
    return (
        <div>
            <UserSearchForm handlingFilteredUsers={handlingFilteredUsers}/>
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
