import axios from "axios";
import {usersAPI} from "../api/api";

const ADDPOST = "ADD-POST"
const ADDSYMBOLPOST = "ADD-SYMBOL-POST"
const CHANGE_PROFILE_ID = "CHANGE_PROFILE_ID"
const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE"

let initialState = {
    messagesData : [
            {post: "Hi are you?", id: "1",likesCount: '5'},
            {post: "Whats is going on?", id: "2",likesCount: '22'},
            {post: "Nice 2 meet u", id: "3",likesCount: '14'}],
        textArea : '',
        profileID: 2,
        currentProfile: null
}
const profileReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADDPOST:
            return {
                ...state,
                messagesData : [...state.messagesData, {post: state.textArea, id: "4", likesCount: 0}],
                textArea: ''
            }

        case ADDSYMBOLPOST:
            return {
                ...state,
                textArea: action.newText
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
        default:
            return state
    }
}
export const setProfileOnPage = (id) => {
    return (dispatch) => {
        let idFromURL = id
        if(!idFromURL){
            idFromURL = 24174
        }
        usersAPI.getProfile(idFromURL).then(data => {
            dispatch(setCurrentProfile(data))
        })
    }
}
export const addNewPost = () => ({type : ADDPOST})
export const addSymbolPost = (text) => ({type : ADDSYMBOLPOST, newText : text})
export const getProfileID = (id) => ({type: CHANGE_PROFILE_ID, id})
export const setCurrentProfile = (profile) => ({type: SET_CURRENT_PROFILE, profile})

export default profileReducer