import {DialogsPage} from "pages/Dialogs";
import { handlingMessage, ThunkDialogType} from "redux/Reducers";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "components/HOC";
import {compose} from "redux";
import {getCurrentDialogID, getDialogs, getFriendsIsFetching, getPrivateMessageData,} from "redux/Selectors";
import {AppStateType} from "redux/reduxStore";
import React, {ComponentType} from "react";
import {dialogActions} from "redux/Actions";
import { FriendFilterType } from "typings";


type OwnPropsType = {
    router: any
}
type StatePropsDialogType = ReturnType<typeof mapStateToProps>
type DispatchPropsDialogType = {
    handlingFriends: (activePage:number,usersOnPage:number, filter:FriendFilterType) => ThunkDialogType
    handlingMessage: (id: number, body: string) => ThunkDialogType
}
type PropsType = StatePropsDialogType & DispatchPropsDialogType & OwnPropsType

const DialogsPageContainer: React.FC<PropsType> = React.memo(({ privateMessageData, dialogs, handlingMessage, dialogID}) => {


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

const sendNewMessage = dialogActions.sendNewMessage

export default compose<ComponentType>(
    connect<StatePropsDialogType, {}, OwnPropsType, AppStateType>(mapStateToProps, {sendNewMessage, handlingMessage}),
    withRedirectIfNoAuth,
)(DialogsPageContainer)

