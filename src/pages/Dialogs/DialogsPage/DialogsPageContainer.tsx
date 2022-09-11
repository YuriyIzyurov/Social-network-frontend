import DialogsPage from "pages/Dialogs/DialogsPage/DialogsPage";
import {actions, FriendFilterType, handlingMessage, ThunkType} from "redux/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "components/HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getCurrentDialogID,
    getDialogs,
    getFriendsIsFetching,
    getPrivateMessageData,
} from "redux/dialog-selectors";
import {AppStateType} from "redux/reduxStore";
import React, { ComponentType } from "react";
import {withRouter} from "components/HOC/withRouter";
import {getRedirectDialogPage} from "redux/dialog-selectors";


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

const DialogsPageContainer: React.FC<PropsType> = React.memo(({ privateMessageData, sendNewMessage, dialogs, handlingMessage, dialogID}) => {


    return <DialogsPage dialogs={dialogs}
                        privateMessageData={privateMessageData}
                        handlingMessage={handlingMessage}
                        userID={dialogID}
     />
})


let mapStateToProps = (state: AppStateType) => {
    return {
        privateMessageData: getPrivateMessageData(state),
        dialogs: getDialogs(state),
        isFetching: getFriendsIsFetching(state),
        dialogID: getCurrentDialogID(state),
    }
}

const sendNewMessage = actions.sendNewMessage
export default compose<ComponentType>(
    connect<StatePropsDialogType, {}, OwnPropsType, AppStateType>(mapStateToProps, {sendNewMessage, handlingMessage}),
    withRedirectIfNoAuth,
)(DialogsPageContainer)

