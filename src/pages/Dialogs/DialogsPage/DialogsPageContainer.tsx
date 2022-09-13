import {DialogsPage} from "pages/Dialogs";
import {actions, FriendFilterType, handlingMessage, ThunkType} from "redux/Reducers/dialogReducer";
import {connect} from "react-redux";
import {withRedirectIfNoAuth} from "components/HOC";
import {compose} from "redux";
import {getCurrentDialogID, getDialogs, getFriendsIsFetching, getPrivateMessageData,} from "redux/Selectors/dialog-selectors";
import {AppStateType} from "redux/reduxStore";
import React, {ComponentType} from "react";


type OwnPropsType = {
    router: any
}
type StatePropsDialogType = ReturnType<typeof mapStateToProps>
type DispatchPropsDialogType = {
    handlingFriends: (activePage:number,usersOnPage:number, filter:FriendFilterType) => ThunkType
    handlingMessage: (id: number, body: string) => ThunkType
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

const sendNewMessage = actions.sendNewMessage

export default compose<ComponentType>(
    connect<StatePropsDialogType, {}, OwnPropsType, AppStateType>(mapStateToProps, {sendNewMessage, handlingMessage}),
    withRedirectIfNoAuth,
)(DialogsPageContainer)

