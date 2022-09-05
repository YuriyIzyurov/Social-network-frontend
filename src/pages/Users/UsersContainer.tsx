import {connect, useDispatch} from "react-redux";
import Users from "pages/Users/Users";
import {
    actions,
    FilterType,
    handlingAddUsers,
    handlingFollowAction,
    handlingUnfollowAction,
    handlingUsers,
} from "redux/usersReducer";
import React, {ComponentType, LegacyRef, useEffect, useRef, useState} from "react";
import Preloader from "components/Preloader/Preloader";
import {withRedirectIfNoAuth} from "components/HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getActivePage,
    getFollowInProcess,
    getIsFetching,
    getSearchFilter,
    getTotalUsers,
    getUsers,
    getUsersOnPage
} from "redux/user-selectors";
import {UserType} from "typings/types";
import {AppStateType} from "redux/reduxStore";
import {useLocation, useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
//todo перерисовка всей страницы из-за изменения роута

type StatePropsType = {
    users: Array<UserType>
    totalUsers: number
    usersOnPage: number
    activePage: number
    isFetching: boolean
    followInProcess: Array<number>
    searchFilter: FilterType

}
type DispatchPropsType = {
    handlingFollowAction: (user: number) => void
    handlingUnfollowAction: (user: number) => void
    handlingUsers: (activePage: number, usersOnPage: number, filter: FilterType) => void
    handlingAddUsers: (activePage: number, usersOnPage: number, filter: FilterType) => void
}

function UsersContainer(props: StatePropsType & DispatchPropsType) {


    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const usersRef = useRef<HTMLDivElement>(null)


    useEffect(() => {

        const {activePage, usersOnPage,searchFilter} = props
        const parsedTerm = searchParams.get("term")
        const parsedFriend = searchParams.get("friend")
        const parsedPage = searchParams.get("page")

        let actualPage = activePage
        let actualFilter = searchFilter

        if(parsedPage) actualPage = +parsedPage
        if(parsedTerm) actualFilter = {...actualFilter, term: parsedTerm}
        if(parsedFriend) actualFilter = {...actualFilter, friend: parsedFriend === "null" ? null : parsedFriend === "true"}

        props.handlingUsers(actualPage,usersOnPage, actualFilter)

        return () => {
            dispatch(actions.setActivePage(1))
            dispatch(actions.filterSettings({term:'', friend: null}))
        }
    },[])

    useEffect(() => {

        const {searchFilter, activePage} = props
        const query:{term?: string, friend?: string, page?: string} = {}

        if(searchFilter.term) query.term = searchFilter.term
        if(searchFilter.friend !== null) query.friend = String(searchFilter.friend)
        if(activePage !== 1) query.page = String(activePage)

        setSearchParams(query)

    },[props.searchFilter, props.activePage])


    const getUsersOnPage = (n: number, usersOnPage: number ) => {
        const {searchFilter} = props
        usersRef.current?.scrollTo(0, 0)
        props.handlingUsers(n,usersOnPage, searchFilter)
    }
    const handlingFilteredUsers = (filter:FilterType) => {
        const {usersOnPage} = props
        props.handlingUsers(1,usersOnPage, filter)
    }
    return (
            <Users totalUsers={props.totalUsers}
                    usersOnPage={props.usersOnPage}
                    activePage={props.activePage}
                    users={props.users}
                    followInProcess={props.followInProcess}
                    getUsersOnPage={getUsersOnPage}
                    handlingFollow={props.handlingFollowAction}
                    handlingUnfollow={props.handlingUnfollowAction}
                    handlingFilteredUsers={handlingFilteredUsers}
                    searchFilter={props.searchFilter}
                    isFetching={props.isFetching}
                   usersRef={usersRef}
            />
    )
}

const mapStateToProps = (state: AppStateType):StatePropsType => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        usersOnPage: getUsersOnPage(state),
        activePage: getActivePage(state),
        isFetching: getIsFetching(state),
        followInProcess: getFollowInProcess(state),
        searchFilter: getSearchFilter(state)
    }
}
export default compose<ComponentType>(
    withRedirectIfNoAuth,
    connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {handlingUsers, handlingAddUsers , handlingFollowAction, handlingUnfollowAction})
)(UsersContainer)

