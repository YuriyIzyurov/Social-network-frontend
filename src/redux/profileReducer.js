import {profileAPI} from "../api/api";

const ADDPOST = "ADD-POST"
const CHANGE_PROFILE_ID = "CHANGE_PROFILE_ID"
const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState = {
    messagesData : [
            {post: "Hi are you?", id: "1",likesCount: '5'},
            {post: "Whats is going on?", id: "2",likesCount: '22'},
            {post: "Nice 2 meet u", id: "3",likesCount: '14'}],
        textArea : '',
        profileID: 2,
        currentProfile: null,
        status: ""
}
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADDPOST:
            return {
                ...state,
                messagesData : [...state.messagesData, {post: action.newText, id: "4", likesCount: 0}],
                textArea: ''
            }
        case CHANGE_PROFILE_ID:
            return {
                ...state,
                profileID: action.id
            }
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}
export const setProfileOnPage = (id) => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(id)
            dispatch(setCurrentProfile(response))

    }
}
export const getUserStatusInProfile = (id) =>{
    return  async (dispatch) => {
       let response = await profileAPI.getUserStatus(id)
            dispatch(setStatusOnProfile(response))
    }
}
export const updateMyStatus = (status) =>{
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
            if(response.resultCode === 0) {
                dispatch(setStatusOnProfile(status))
            }
    }
}
export const addNewPost = (text) => ({type : ADDPOST, newText : text})
export const getProfileID = (id) => ({type: CHANGE_PROFILE_ID, id})
export const setCurrentProfile = (profile) => ({type: SET_CURRENT_PROFILE, profile})
export const setStatusOnProfile = (status) => ({type: SET_STATUS, status})

export default profileReducer