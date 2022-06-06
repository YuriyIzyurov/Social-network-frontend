import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADDPOST = "ADD-POST"
const CHANGE_PROFILE_ID = "CHANGE_PROFILE_ID"
const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_PHOTO = "SET_PHOTO"

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
        case SET_PHOTO:
            return {
                ...state,
                currentProfile: {...state.currentProfile, photos: action.photo}
            }
        default:
            return state
    }
}
export const setProfileOnPage = (id) => {
    return async (dispatch) => {
        const response = await profileAPI.getProfile(id)
            dispatch(setCurrentProfile(response))

    }
}
export const getUserStatusInProfile = (id) =>{
    return  async (dispatch) => {
        const response = await profileAPI.getUserStatus(id)
            dispatch(setStatusOnProfile(response))
    }
}
export const updateMyStatus = (status) =>{
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
            if(response.resultCode === 0) {
                dispatch(setStatusOnProfile(status))
            }
    }
}
export const handlePhotoChange = (file) =>{
    return async (dispatch) => {
        const response = await profileAPI.uploadPhoto(file)
            if(response.resultCode === 0) {
                dispatch(setPhotoOnProfile(response.data.photos))
            }
    }
}
export const sendProfileDataOnServ = (newData) =>{
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        const response = await profileAPI.updateProfileData(newData)
        if (response.resultCode === 0) {
            dispatch(setProfileOnPage(userId))
        } else {
            let error = response.messages[0]
            let errorObj = {'_error': error}
            let match = error.match(/Invalid url format \(Contacts->(.+)\)/)
            if (match) {
                let fieldName = match[1].toLowerCase()
                errorObj = { 'contacts': {}}
                errorObj.contacts[fieldName] = error
            }
            dispatch(stopSubmit("ProfileInfo", errorObj))
            throw error
        }
    }
}
export const addNewPost = (text) => ({type : ADDPOST, newText : text})
export const getProfileID = (id) => ({type: CHANGE_PROFILE_ID, id})
export const setCurrentProfile = (profile) => ({type: SET_CURRENT_PROFILE, profile})
export const setStatusOnProfile = (status) => ({type: SET_STATUS, status})
export const setPhotoOnProfile = (photo) => ({type: SET_PHOTO, photo})

export default profileReducer