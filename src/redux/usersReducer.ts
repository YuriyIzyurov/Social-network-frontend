import { UserType } from "typings/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import { ThunkAction } from "redux-thunk/es/types";
import {usersAPI} from "api/usersAPI";


export type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.searchFilter

let initialState = {users: [] as Array<UserType>,
                    totalUsers: 0,
                    usersOnPage: 10,
                    activePage: 1,
                    isFetching: false,
                    followInProcess: [] as Array<number>, //array of users ID is now following in process
                    searchFilter: {
                        term: '',
                        friend: null as null | boolean
                    },
                    friends: [] as Array<UserType>,
                    totalFriends: 0
}

const usersReducer = (state = initialState, action:ActionType):InitialStateType => {
    switch(action.type){
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(item=>{
                    return item.id === action.userID ? {...item, followed: !item.followed} : item
                })
            }
        case "SET_USERS":
            return {
                 ...state,
                users: action.users
            }
        case "ADD_USERS":
            return {
                 ...state,
                users: [...state.users, ...action.users]
            }
        case "SET_ACTIVE_PAGE":
            return {
                ...state,
                activePage: action.activePage
            }
        case "SET_TOTAL_USERS":
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        case  "FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "FOLLOW_IN_PROCESS":
            return {
                ...state,
                followInProcess: action.isFetching
                    ? [...state.followInProcess, action.userID]
                    : state.followInProcess.filter(id => id !== action.userID)
            }
        case "FILTERED_USERS":
            return {
                ...state,
                searchFilter:action.payload
            }
        case "SET_FRIENDS":
            return {
                ...state,
                friends: action.friends
            }
        case "SET_TOTAL_FRIENDS":
            return {
                ...state,
                totalFriends: action.totalFriends
            }
        default:
            return state
    }

}

export const handlingUsers =  (activePage:number,usersOnPage:number,filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
            dispatch(actions.dataIsFetching(true))
            dispatch(actions.setActivePage(activePage))
            dispatch(actions.filterSettings(filter))
        let response = await usersAPI.getUsers(activePage, usersOnPage, filter.term, filter.friend )
            dispatch(actions.dataIsFetching(false))
            dispatch(actions.setUsers(response.items))
            dispatch(actions.setTotalUsers(response.totalCount))

    }
}
export const handlingSidebarUsers =  (): ThunkType => {
    return async (dispatch, getState) => {
            dispatch(actions.dataIsFetching(true))
        let response = await usersAPI.getSidebarUsers()
            dispatch(actions.dataIsFetching(false))
            const shuffledArray = response.items.sort(() => Math.round(Math.random() * 100) - 50)
            dispatch(actions.setFriends(shuffledArray))
            dispatch(actions.setTotalFriends(response.totalCount))

    }
}

export const handlingAddUsers =  (activePage:number,usersOnPage:number,filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
            dispatch(actions.setActivePage(activePage))
            dispatch(actions.filterSettings(filter))
        let response = await usersAPI.getUsers(activePage, usersOnPage, filter.term, filter.friend )
            dispatch(actions.addUsers(response.items))
            dispatch(actions.setTotalUsers(response.totalCount))

    }
}

export const handlingFollowAction = (id:number):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.followActionInProcess(true, id))
        let response = await usersAPI.followUser(id)
            if(response.resultCode === 0){
                dispatch(actions.followToggle(id))
            }
            dispatch(actions.followActionInProcess(false, id))
    }
}

export const handlingUnfollowAction = (id:number):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.followActionInProcess(true, id))
        let response = await usersAPI.unFollowUser(id)
            if(response.resultCode === 0){
                dispatch(actions.followToggle(id))
            }
            dispatch(actions.followActionInProcess(false, id))
    }
}
export const actions = {
    followToggle: (userID:number) => ({type : "FOLLOW", userID} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    addUsers: (users: Array<UserType>) => ({type: "ADD_USERS", users} as const),
    setActivePage: (activePage:number) => ({type: "SET_ACTIVE_PAGE", activePage} as const),
    setTotalUsers: (totalUsers:number)=> ({type: "SET_TOTAL_USERS", totalUsers} as const),
    dataIsFetching: (isFetching:boolean) => ({type: "FETCHING", isFetching} as const),
    followActionInProcess: (isFetching:boolean, userID:number)=>({type:"FOLLOW_IN_PROCESS", isFetching, userID} as const),
    filterSettings: (searchFilter: FilterType)=>({type:"FILTERED_USERS", payload:searchFilter} as const),
    setFriends: (friends: Array<UserType>)=>({type:"SET_FRIENDS", friends} as const),
    setTotalFriends: (totalFriends:number)=>({type:"SET_TOTAL_FRIENDS", totalFriends} as const),
}


export default usersReducer
