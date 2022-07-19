import Dialogs from "./Dialogs";
import {actions, FriendFilterType, handlingMessage, ThunkType} from "../../redux/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getDialogs,
  getFriendsIsFetching,
    getPrivateMessageData,
} from "../../redux/dialog-selectors";
import {AppStateType} from "../../redux/reduxStore";
import React, { ComponentType } from "react";
import {withRouter} from "../HOC/withRouter";


type OwnPropsType = {
    router: any
}
type StatePropsDialogType = ReturnType<typeof mapStateToProps>
type DispatchPropsDialogType = {
    sendNewMessage: typeof sendNewMessage
    handlingFriends: (activePage:number,usersOnPage:number, filter:FriendFilterType) => ThunkType
    handlingMessage: (id: number, body: string) => ThunkType
}
type PropsType = StatePropsDialogType & DispatchPropsDialogType & OwnPropsType

const DialogsContainer: React.FC<PropsType> = ({ privateMessageData, sendNewMessage, dialogs, handlingMessage, router}) => {


    return <Dialogs dialogs={dialogs}
                    privateMessageData={privateMessageData}
                    handlingMessage={handlingMessage}
                    userID={router.params.id}
     />
}


let mapStateToProps = (state: AppStateType) => {
    return {
        privateMessageData: getPrivateMessageData(state),
        dialogs: getDialogs(state),
        isFetching: getFriendsIsFetching(state),
    }
}

const sendNewMessage = actions.sendNewMessage
export default compose<ComponentType>(
    connect<StatePropsDialogType, {}, OwnPropsType, AppStateType>(mapStateToProps, {sendNewMessage, handlingMessage}),
    withRedirectIfNoAuth,
    withRouter
)(DialogsContainer)
