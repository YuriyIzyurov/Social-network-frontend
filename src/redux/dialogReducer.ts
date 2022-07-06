import {DialogDataType, PrivateMessageDataType, UserType} from "../typings/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersAPI";
import {ThunkType as SidebarThunkType} from "./sidebarReducer";
import {actions as actionsUser} from "../redux/usersReducer"
import {actions as actionsSidebar} from "../redux/sidebarReducer"
import {ActionType as UserActionType} from "../redux/usersReducer"
import {ActionType as SidebarActionType} from "../redux/sidebarReducer"
import {ThunkAction} from "redux-thunk/es/types";
import {dialogsAPI} from "../api/dialogsAPI";



export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type FriendFilterType = {
    term: string
    friend: boolean
}

let initialState = {
    privateMessageData : [
        {message: "Hi are you?", id: 1},
        {message: "Whats is going on?", id: 2},
        {message: "Nice 2 meet u", id: 3}] as Array<PrivateMessageDataType>,
    textAreaMess : '',
    friends: [] as Array<UserType>,
    activePage: 1,
    isFetching: false,
    followInProcess: [] as Array<number>, //array of users ID is now following in process
    friendList: [] as Array<UserType>,
    totalFriends: 0,
    friendsOnPage: 6,

}

const dialogReducer = (state = initialState,action:ActionType | UserActionType | SidebarActionType):InitialStateType => {

    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                privateMessageData : [...state.privateMessageData, {message: action.messageText, id: 5}],
                textAreaMess : ''
            }

        case "SET_FRIENDS_DIALOG":
            return {
                ...state,
                friends: [...state.friends, ...action.friends]
            }
        case "CLEAR_FRIEND_LIST":
            return {
                ...state,
                friends: []
            }
        case "SET_TOTAL_FRIENDS_DIALOG":
            return {
                ...state,
                totalFriends: action.totalFriends
            }
        case "SET_ACTIVE_FRIEND_PAGE":
            return {
                ...state,
                activePage: action.activePage
            }

        case  "IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }

        default:
            return state
    }
}
export const handlingFriends =  (activePage:number,usersOnPage:number, filter:FriendFilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.friendListIsFetching(true))
        dispatch(actions.setActiveFriendPage(activePage))
        let response = await usersAPI.getUsers(activePage, usersOnPage, filter.term, filter.friend )
        dispatch(actions.friendListIsFetching(false))
        dispatch(actions.setFriendsDialog(response.items))
        dispatch(actions.setTotalFriends(response.totalCount))

    }
}

export const handlingMessage =  (id: number, body: string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await dialogsAPI.sendMessageToFriend(id, body)
    }
}


export const actions = {
    sendNewMessage: (text:string) => ({type : "SEND_MESSAGE", messageText : text} as const),
    setFriendsDialog: (friends: Array<UserType>) => ({type: "SET_FRIENDS_DIALOG", friends} as const),
    setActiveFriendPage: (activePage:number) => ({type: "SET_ACTIVE_FRIEND_PAGE", activePage} as const),
    setTotalFriends: (totalFriends:number)=> ({type: "SET_TOTAL_FRIENDS_DIALOG", totalFriends} as const),
    friendListIsFetching: (isFetching:boolean) => ({type: "IS_FETCHING", isFetching} as const),
    clearFriendList: () => ({type: "CLEAR_FRIEND_LIST"} as const),
}

export default dialogReducer