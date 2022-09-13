import React, {LegacyRef, memo, useEffect} from "react"
import 'pages/Users/Users.scss'
import {UserType} from "typings/types";
import {FilterType, handlingAddUsers} from "redux/Reducers/usersReducer";
import {Pagination} from "antd";
import {useAppDispatch} from "redux/reduxStore";
import {UserSearchForm} from "components/Forms";
import {startDialogWithFriend} from "redux/Reducers/dialogReducer";
import {useNavigate} from "react-router";
import {UserList} from "pages/Users";
import fill from "zadachi";

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


export const Users: React.FC<PropsType> = memo(({totalUsers, handlingFilteredUsers, usersOnPage, activePage, getUsersOnPage, users,searchFilter, handlingFollow, handlingUnfollow, followInProcess, isFetching, usersRef }) => {

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
    useEffect(() => {
        let array = [4,2,0,3,2,5]
        fill(array)
    },[])

    return (
        <div className="users">
            <div className="users__find">
                <UserSearchForm handlingFilteredUsers={handlingFilteredUsers}/>
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
                        showSizeChanger={false}
                        defaultCurrent={1}
                        current={activePage}
                        total={totalUsers}
                        onChange={getUsersOnPage}
                    />
                </div>
            </div>
        </div>
    );
})


