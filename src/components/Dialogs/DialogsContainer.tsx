import Dialogs from "./Dialogs";
import {actions, handlingFriends} from "../../redux/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getActiveFriendsPage,
    getFriends, getFriendsIsFetching,
    getPrivateMessageData,
    getTextAreaMess,
    getTotalFriends
} from "../../redux/dialog-selectors";
import {AppStateType} from "../../redux/reduxStore";
import { ComponentType } from "react";
import {
    getActivePage,
    getFollowInProcess,
    getIsFetching, getSearchFilter,
    getTotalUsers,
    getUsers,
    getUsersOnPage
} from "../../redux/user-selectors";

let mapStateToProps = (state: AppStateType) => {
    return {
        privateMessageData: getPrivateMessageData(state),
        friends: getFriends(state),
        totalFriends: getTotalFriends(state),
        isFetching: getFriendsIsFetching(state),
    }
}

const sendNewMessage = actions.sendNewMessage
export default compose<ComponentType>(
    connect(mapStateToProps, {sendNewMessage, handlingFriends}),
    withRedirectIfNoAuth
)(Dialogs)

