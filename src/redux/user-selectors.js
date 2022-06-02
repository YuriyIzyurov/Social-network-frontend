export const getUsers = (state) => {
    return state.userList.users
}

export const getTotalUsers = (state) => {
    return state.userList.totalUsers
}

export const getUsersOnPage = (state) => {
    return state.userList.usersOnPage
}

export const getActivePage = (state) => {
    return state.userList.activePage
}

export const getIsFetching = (state) => {
    return state.userList.isFetching
}

export const getFollowInProcess = (state) => {
    return state.userList.followInProcess
}