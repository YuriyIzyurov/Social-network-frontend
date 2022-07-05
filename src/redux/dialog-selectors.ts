import {AppStateType} from "./reduxStore";

export const getTextAreaMess = (state:AppStateType) => {
    return state.dialog.textAreaMess
}

export const getPrivateMessageData = (state:AppStateType) => {
    return state.dialog.privateMessageData
}

export const getFriends = (state:AppStateType) => {
    return state.dialog.friends
}
//export const getUsersSuperSelector = createSelector

export const getTotalFriends = (state:AppStateType) => {
    return state.dialog.totalFriends
}

export const getFriendsOnPage = (state:AppStateType) => {
    return state.dialog.friendsOnPage
}
export const getActiveFriendsPage = (state:AppStateType) => {
    return state.dialog.activePage
}

export const getFriendsIsFetching = (state:AppStateType) => {
    return state.dialog.isFetching
}
