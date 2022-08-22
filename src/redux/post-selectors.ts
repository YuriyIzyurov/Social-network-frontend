import {AppStateType} from "./reduxStore";

export const getCurrentProfile = (state:AppStateType) => {
    return state.profile.currentProfile
}

export const getTextArea = (state:AppStateType) => {
    return state.profile.textArea
}

export const getMessagesData = (state:AppStateType) => {
    return state.profile.messagesData
}

export const getPosts = (state: AppStateType) => {
    return state.blog.posts
}
export const getMyPosts = (state: AppStateType) => {
    return state.blog.myPosts
}
export const getTotalCount = (state: AppStateType) => {
    return state.blog.totalCount
}
export const getMyTotalPosts = (state: AppStateType) => {
    return state.blog.countOfMyPosts
}
export const getPostsOnPage = (state: AppStateType) => {
    return state.blog.postsOnPage
}
export const getActivePostPage = (state: AppStateType) => {
    return state.blog.activePage
}
export const getPostID = (state: AppStateType) => {
    return state.blog.id
}
export const getFetching = (state: AppStateType) => {
    return state.blog.isFetching
}
export const getMyTabPickStatus = (state: AppStateType) => {
    return state.blog.isMyTabPicked
}
export const getCurrentFilter = (state: AppStateType) => {
    return state.blog.searchFilter
}
export const getCurrentAuthor = (state: AppStateType) => {
    return state.blog.currentAuthorID
}
export const getScrollState = (state: AppStateType) => {
    return state.blog.isScrollTop
}
