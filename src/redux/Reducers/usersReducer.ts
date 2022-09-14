import { UserType,FilterType } from "typings";
import {AppStateType, InferActionsTypes} from "redux/reduxStore";
import { ThunkAction } from "redux-thunk/es/types";
import {usersAPI} from "api/usersAPI";
import {userActions} from "redux/Actions";



type ActionType = InferActionsTypes<typeof userActions>
export type ThunkUserType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
type InitialUserStateType = typeof initialState


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

export const usersReducer = (state = initialState, action:ActionType):InitialUserStateType => {
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
        case "DELETE_FRIENDS":
            return {
                ...state,
                friends: [],
                totalFriends: 0
            }
        default:
            return state
    }

}

export const handlingUsers =  (activePage:number,usersOnPage:number,filter: FilterType): ThunkUserType => {
    return async (dispatch, getState) => {
            dispatch(userActions.dataIsFetching(true))
            dispatch(userActions.setActivePage(activePage))
            dispatch(userActions.filterSettings(filter))
        let response = await usersAPI.getUsers(activePage, usersOnPage, filter.term, filter.friend )
            dispatch(userActions.dataIsFetching(false))
            dispatch(userActions.setUsers(response.items))
            dispatch(userActions.setTotalUsers(response.totalCount))

    }
}
export const handlingSidebarUsers =  (): ThunkUserType => {
    return async (dispatch, getState) => {
            dispatch(userActions.dataIsFetching(true))
        let response = await usersAPI.getSidebarUsers()
            dispatch(userActions.dataIsFetching(false))
            const shuffledArray = response.items.sort(() => Math.round(Math.random() * 100) - 50)
            dispatch(userActions.setFriends(shuffledArray))
            dispatch(userActions.setTotalFriends(response.totalCount))

    }
}

export const handlingAddUsers =  (activePage:number,usersOnPage:number,filter: FilterType): ThunkUserType => {
    return async (dispatch, getState) => {
            dispatch(userActions.setActivePage(activePage))
            dispatch(userActions.filterSettings(filter))
        let response = await usersAPI.getUsers(activePage, usersOnPage, filter.term, filter.friend )
            dispatch(userActions.addUsers(response.items))
            dispatch(userActions.setTotalUsers(response.totalCount))

    }
}

export const handlingFollowAction = (id:number):ThunkUserType => {
    return async (dispatch) => {
        dispatch(userActions.followActionInProcess(true, id))
        let response = await usersAPI.followUser(id)
            if(response.resultCode === 0){
                dispatch(userActions.followToggle(id))
            }
            dispatch(userActions.followActionInProcess(false, id))
    }
}

export const handlingUnfollowAction = (id:number):ThunkUserType => {
    return async (dispatch) => {
        dispatch(userActions.followActionInProcess(true, id))
        let response = await usersAPI.unFollowUser(id)
            if(response.resultCode === 0){
                dispatch(userActions.followToggle(id))
            }
            dispatch(userActions.followActionInProcess(false, id))
    }
}

export const handleDeleteFriends = ():ThunkUserType => {
    return async (dispatch) => {

    }
}



