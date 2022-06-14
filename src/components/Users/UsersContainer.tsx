import {connect} from "react-redux";
import Users from "./Users";
import {
    handlingFollowAction,
    handlingUnfollowAction,
    handlingUsers,
    handlingUsersOnPage
} from "../../redux/usersReducer";
import React, {ComponentType} from "react";
// @ts-ignore
import Preloader from "../../common/Preloader/Preloader";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getActivePage, getFollowInProcess,
    getIsFetching,
    getTotalUsers,
    getUsers,
    getUsersOnPage
} from "../../redux/user-selectors";
import {UserType} from "../../typings/types";
import {AppStateType} from "../../redux/reduxStore";

type StatePropsType = {
    users: Array<UserType>
    totalUsers: number
    usersOnPage: number
    activePage: number
    isFetching: boolean
    followInProcess: Array<number>

}
type DispatchPropsType = {
    handlingFollowAction: (user: number) => void
    handlingUnfollowAction: (user: number) => void
    handlingUsers: (activePage: number,usersOnPage: number) => void
    handlingUsersOnPage: (n: number, activePage: number,usersOnPage: number) => any
}
class UsersContainer extends React.Component<StatePropsType & DispatchPropsType> {

    componentDidMount() {

        const {activePage, usersOnPage } = this.props
        this.props.handlingUsers(activePage,usersOnPage)
    }

    getUsersOnPage = (n: number) => {
        const {activePage, usersOnPage } = this.props
        this.props.handlingUsersOnPage(n, activePage, usersOnPage)
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader /> : <Users totalUsers={this.props.totalUsers}
                                                                usersOnPage={this.props.usersOnPage}
                                                                activePage={this.props.activePage}
                                                                users={this.props.users}
                                                                followInProcess={this.props.followInProcess}
                                                                getUsersOnPage={this.getUsersOnPage}
                                                                handlingFollowAction={this.props.handlingFollowAction}
                                                                handlingUnfollowAction={this.props.handlingUnfollowAction}


                />}

            </div>
        )
    }
}
const mapStateToProps = (state: AppStateType):StatePropsType => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        usersOnPage: getUsersOnPage(state),
        activePage: getActivePage(state),
        isFetching: getIsFetching(state),
        followInProcess: getFollowInProcess(state)
    }
}
export default compose<ComponentType>(
    withRedirectIfNoAuth,
    connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {handlingUsers, handlingUsersOnPage, handlingFollowAction, handlingUnfollowAction})
)(UsersContainer)

