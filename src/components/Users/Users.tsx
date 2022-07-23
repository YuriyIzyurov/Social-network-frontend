import React, {Dispatch, LegacyRef, SetStateAction, useEffect, useState} from "react"
import './Users.scss'
import {UserType} from "../../typings/types";
import {FilterType, handlingAddUsers} from "../../redux/usersReducer";
import { Button, Divider, Dropdown, List, Menu, Pagination, Skeleton} from "antd";
import Avatar from "../Dialogs/DialogItem/Avatar";
import Search from "antd/lib/input/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import {useAppDispatch} from "../../redux/reduxStore";
import UserSearchform from "./UserSearchform";
import { NavLink } from "react-router-dom";
import { Button as AntButton, Tooltip, Avatar as AntAvatar } from 'antd';
import { UserAddOutlined, UserDeleteOutlined, CommentOutlined } from '@ant-design/icons'
import {startDialogWithFriend} from "../../redux/dialogReducer";
import {useNavigate} from "react-router";
import Preloader from "../../common/Preloader/Preloader";
import {UserList} from "./UserList";

type PropsType = {
    totalUsers: number
    usersOnPage: number
    activePage: number
    getUsersOnPage: (n:number, usersOnPage: number) => void
    users: Array<UserType>
    handlingFollow: (user: number) => void
    handlingUnfollow: (user: number) => void
    followInProcess: Array<number>
    handlingFilteredUsers: (filter:FilterType) => void
    searchFilter: FilterType
    isFetching: boolean
    usersRef: LegacyRef<HTMLDivElement>
}


const Users: React.FC<PropsType> = ({totalUsers, handlingFilteredUsers, usersOnPage, activePage, getUsersOnPage, users,searchFilter, handlingFollow, handlingUnfollow, followInProcess, isFetching, usersRef }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const nextPage = activePage + 1
    const isPagesLast = Math.abs(totalUsers/usersOnPage - activePage) < 2

    const loadMoreData = () => {
        dispatch(handlingAddUsers(nextPage, usersOnPage, searchFilter))
    }
    const openDialog = (id: number) =>{
        dispatch(startDialogWithFriend(id))
        let path = `/dialogs/${id}`
        navigate(path)
    }

    return (
        <div className="users">
            <div className="users__find">
                <UserSearchform handlingFilteredUsers={handlingFilteredUsers}/>
                         <UserList users={users}
                                    handlingFollow={handlingFollow}
                                    handlingUnfollow={handlingUnfollow}
                                    followInProcess={followInProcess}
                                    loadMoreData={loadMoreData}
                                    isPagesLast={isPagesLast}
                                    openDialog={openDialog}
                                    isFetching={isFetching}
                                   usersRef={usersRef}
                        />

                <div className="users__find-paginator">
                    <Pagination
                        defaultCurrent={1}
                        current={activePage}
                        total={totalUsers}
                        onChange={getUsersOnPage}
                    />
                </div>
            </div>
        </div>
    );
}
export default Users

