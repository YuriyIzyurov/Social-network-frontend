import {AppStateType} from "redux/reduxStore";


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
export const getAuthorTabPickStatus = (state: AppStateType) => {
    return state.blog.isAuthorTabPicked
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
