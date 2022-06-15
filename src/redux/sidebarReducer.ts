import {usersAPI} from "../api/usersAPI";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk/es/types";
import {UserType} from "../typings/types";

type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type InitialStateType = typeof initialState

let initialState = {
    friendList: [] as Array<UserType>,
    totalFriends: 0,
    usersOnPage: 6,
}

const sidebarReducer = (state = initialState,action:ActionType):InitialStateType => {
    switch(action.type){

        case "SET_FRIENDS":
            return {
                ...state,
                friendList: action.friends
            }
        case "SET_TOTAL_FRIENDS":
            return {
                ...state,
                totalFriends: action.totalFriends
            }
        default: return state
    }
}

export const getFriendsOnSidebar =  (usersOnPage:number): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getFriends(usersOnPage)
        dispatch(actions.setFriends(response.items))
        dispatch(actions.setTotalFriends(response.totalCount))
    }
}
export const actions = {
    setFriends: (friends: Array<UserType>) => ({type: "SET_FRIENDS", friends} as const),
    setTotalFriends: (totalFriends:number)=> ({type: "SET_TOTAL_FRIENDS", totalFriends} as const),

}

export default sidebarReducer
