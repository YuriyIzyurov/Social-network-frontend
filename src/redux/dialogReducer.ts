import {DialogDataType, PhotosType, PrivateMessageDataType, PrivateMessageType, UserType} from "../typings/types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersAPI";
import {ThunkType as SidebarThunkType} from "./sidebarReducer";
import {actions as actionsUser} from "../redux/usersReducer"
import {actions as actionsSidebar} from "../redux/sidebarReducer"
import {ActionType as UserActionType} from "../redux/usersReducer"
import {ActionType as SidebarActionType} from "../redux/sidebarReducer"
import {ThunkAction} from "redux-thunk/es/types";
import {dialogsAPI} from "../api/dialogsAPI";
import {ResultCode} from "../api/api";
import {profileAPI} from "../api/profileAPI";



export type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
export type FriendFilterType = {
    term: string
    friend: boolean
}

let initialState = {
    privateMessageData : [] as Array<PrivateMessageType>,
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
                privateMessageData : [...state.privateMessageData, action.payload],
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
    debugger
    return async (dispatch, getState) => {
        let response = await dialogsAPI.sendMessageToFriend(id, body)
        if(response.resultCode === ResultCode.Success){
            let response2 = await profileAPI.getProfile(response.data.message.senderId)
            let {photos} = response2
            let message = {...response.data.message, photos}
            dispatch(actions.sendNewMessage(message))
        }
    }
}


export const actions = {
    sendNewMessage: (messageData: PrivateMessageType) => ({type : "SEND_MESSAGE", payload : messageData} as const),
    setFriendsDialog: (friends: Array<UserType>) => ({type: "SET_FRIENDS_DIALOG", friends} as const),
    setActiveFriendPage: (activePage:number) => ({type: "SET_ACTIVE_FRIEND_PAGE", activePage} as const),
    setTotalFriends: (totalFriends:number)=> ({type: "SET_TOTAL_FRIENDS_DIALOG", totalFriends} as const),
    friendListIsFetching: (isFetching:boolean) => ({type: "IS_FETCHING", isFetching} as const),
    clearFriendList: () => ({type: "CLEAR_FRIEND_LIST"} as const),
}

export default dialogReducer