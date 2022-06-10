import {usersAPI} from "../api/api";
import { UserType } from "../typings/types";

const FOLLOW = "FOLLOW"
const SET_USERS = "SET_USERS"
const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"
const FETCHING = "FETCHING"
const FOLLOW_IN_PROCESS = "FOLLOW_IN_PROCESS"



let initialState = {users: [] as Array<UserType>,
                    totalUsers: 0,
                    usersOnPage: 10,
                    activePage: 1,
                    isFetching: false,
                    followInProcess: [] as Array<number> //array of users ID is now following in process

}
export type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action:any):InitialStateType => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item=>{
                    return item.id === action.userID ? {...item, followed: !item.followed} : item
                })
            }
        case SET_USERS:
            return {
                 ...state,
                users: action.users
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.activePage
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        case  FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOW_IN_PROCESS:

            return {
                ...state,
                followInProcess: action.isFetching
                    ? [...state.followInProcess, action.userID]
                    : state.followInProcess.filter(id => id !== action.userID)
            }
        default:
            return state
    }

}
export const handlingUsers =  (activePage:number,usersOnPage:number) => {
    return async (dispatch:any) => {
        dispatch(dataIsFetching(true))
        let response = await usersAPI.getUsers(activePage, usersOnPage)
            dispatch(dataIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsers(response.totalCount))

    }
}
export  const handlingUsersOnPage = (n:number, activePage:number, usersOnPage:number) => {

    return async (dispatch:any) => {
        dispatch(setActivePage(n))
        dispatch(dataIsFetching(true))
        let response = await usersAPI.getUsers(activePage, usersOnPage)
            dispatch(dataIsFetching(false))
            dispatch(setUsers(response.items))

    }
}

export const handlingFollowAction = (id:number) => {
    return async (dispatch:any) => {
        dispatch(followActionInProcess(true, id))
        let response = await usersAPI.followUser(id)
            if(response.resultCode === 0){
                dispatch(followToggle(id))
            }
            dispatch(followActionInProcess(false, id))
    }
}

export const handlingUnfollowAction = (id:number) => {
    return async (dispatch:any) => {
        dispatch(followActionInProcess(true, id))
        let response = await usersAPI.unFollowUser(id)
            if(response.resultCode === 0){
                dispatch(followToggle(id))
            }
            dispatch(followActionInProcess(false, id))
    }
}

type FollowToggleType = {
    type: typeof FOLLOW
    userID: number
}
type SetUsers = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetActivePage = {
    type: typeof SET_ACTIVE_PAGE
    activePage: number
}
type SetTotalUsers = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}
type DataIsFetching = {
    type: typeof FETCHING
    isFetching: boolean
}
type FollowActionInProcess = {
    type: typeof FOLLOW_IN_PROCESS
    isFetching: boolean
    userID: number
}
export const followToggle = (userID:number):FollowToggleType => ({type : FOLLOW, userID})
export const setUsers = (users: Array<UserType>):SetUsers => ({type: SET_USERS, users})
export const setActivePage = (activePage:number):SetActivePage => ({type: SET_ACTIVE_PAGE, activePage})
export const setTotalUsers = (totalUsers:number):SetTotalUsers => ({type: SET_TOTAL_USERS, totalUsers})
export const dataIsFetching = (isFetching:boolean):DataIsFetching => ({type: FETCHING, isFetching})
export const followActionInProcess = (isFetching:boolean, userID:number):FollowActionInProcess =>({type:FOLLOW_IN_PROCESS, isFetching, userID})


export default usersReducer
