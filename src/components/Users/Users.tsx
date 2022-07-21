import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import './Users.scss'
import {UserType} from "../../typings/types";
import {FilterType, handlingAddUsers} from "../../redux/usersReducer";
import { Button, Divider, Dropdown, List, Menu, Pagination, Skeleton} from "antd";
import Avatar from "../Dialogs/DialogItem/Avatar";
import Search from "antd/lib/input/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import {useAppDispatch} from "../../redux/reduxStore";
import UserSearchform from "./UserSearchform";

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
}


const Users: React.FC<PropsType> = ({totalUsers, handlingFilteredUsers, usersOnPage, activePage, getUsersOnPage, users,searchFilter, handlingFollow, handlingUnfollow, followInProcess }) => {

    const dispatch = useAppDispatch()
    const nextPage = activePage + 1
    const isPagesLast = Math.abs(totalUsers/usersOnPage - activePage) < 2

    const loadMoreData = () => {

        dispatch(handlingAddUsers(nextPage, usersOnPage, searchFilter))
    };

    return (
        <div className="users">
            <div className="users__find">
                <UserSearchform handlingFilteredUsers={handlingFilteredUsers}/>
                <div
                    id="scrollableDiv"
                    className="users__find-content"
                >
                    <InfiniteScroll
                        dataLength={users.length}
                        next={loadMoreData}
                        hasMore={users.length < 200}
                        loader={isPagesLast ? <Divider plain>It is all, nothing more 🤐</Divider> : <Skeleton avatar paragraph={{rows: 1}} active/>}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            dataSource={users}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar user={item}/>}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description={item.status}
                                    />
                                    <div>Content</div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
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

