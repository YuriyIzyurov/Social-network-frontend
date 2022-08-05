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
