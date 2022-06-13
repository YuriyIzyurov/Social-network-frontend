import {usersAPI} from "../api/api";
import { UserType } from "../typings/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import { ThunkAction } from "redux-thunk/es/types";

let initialState = {users: [] as Array<UserType>,
                    totalUsers: 0,
                    usersOnPage: 10,
                    activePage: 1,
                    isFetching: false,
                    followInProcess: [] as Array<number> //array of users ID is now following in process

}
export type InitialStateType = typeof initialState


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
        default:
            return state
    }

}

type ActionType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const handlingUsers =  (activePage:number,usersOnPage:number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.dataIsFetching(true))
        let response = await usersAPI.getUsers(activePage, usersOnPage)
            dispatch(actions.dataIsFetching(false))
            dispatch(actions.setUsers(response.items))
            dispatch(actions.setTotalUsers(response.totalCount))

    }
}
export  const handlingUsersOnPage = (n:number, activePage:number, usersOnPage:number):ThunkType => {

    return async (dispatch) => {
        dispatch(actions.setActivePage(n))
        dispatch(actions.dataIsFetching(true))
        let response = await usersAPI.getUsers(activePage, usersOnPage)
            dispatch(actions.dataIsFetching(false))
            dispatch(actions.setUsers(response.items))

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
    setActivePage: (activePage:number) => ({type: "SET_ACTIVE_PAGE", activePage} as const),
    setTotalUsers: (totalUsers:number)=> ({type: "SET_TOTAL_USERS", totalUsers} as const),
    dataIsFetching: (isFetching:boolean) => ({type: "FETCHING", isFetching} as const),
    followActionInProcess: (isFetching:boolean, userID:number)=>({type:"FOLLOW_IN_PROCESS", isFetching, userID} as const)
}


export default usersReducer
