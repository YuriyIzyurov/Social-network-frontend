import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

export const getUsers = (state:AppStateType) => {
    return state.userList.users
}
//export const getUsersSuperSelector = createSelector

export const getTotalUsers = (state:AppStateType) => {
    return state.userList.totalUsers
}
export const getFriends = (state:AppStateType) => {
    return state.userList.friends
}
export const getTotalFriends = (state:AppStateType) => {
    return state.userList.totalFriends
}

export const getUsersOnPage = (state:AppStateType) => {
    return state.userList.usersOnPage
}

export const getActivePage = (state:AppStateType) => {
    return state.userList.activePage
}

export const getIsFetching = (state:AppStateType) => {
    return state.userList.isFetching
}

export const getFollowInProcess = (state:AppStateType) => {
    return state.userList.followInProcess
}
export const getSearchFilter = (state:AppStateType) => {
    return state.userList.searchFilter
}
