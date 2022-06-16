import {connect} from "react-redux";
import Users from "./Users";
import {
    FilterType,
    handlingFollowAction,
    handlingUnfollowAction,
    handlingUsers,
} from "../../redux/usersReducer";
import React, {ComponentType} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getActivePage, getFollowInProcess,
    getIsFetching, getSearchFilter,
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
    searchFilter: FilterType

}
type DispatchPropsType = {
    handlingFollowAction: (user: number) => void
    handlingUnfollowAction: (user: number) => void
    handlingUsers: (activePage: number,usersOnPage: number, filter: FilterType) => void
}

class UsersContainer extends React.Component<StatePropsType & DispatchPropsType> {

    componentDidMount() {
        const {activePage, usersOnPage,searchFilter} = this.props
        this.props.handlingUsers(activePage,usersOnPage, searchFilter)
    }

    getUsersOnPage = (n: number) => {
        const {usersOnPage, searchFilter} = this.props
        this.props.handlingUsers(n,usersOnPage, searchFilter)
    }
    handlingFilteredUsers = (filter:FilterType) => {
        const {usersOnPage} = this.props
        this.props.handlingUsers(1,usersOnPage, filter)
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
                                                                handlingFilteredUsers={this.handlingFilteredUsers}


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
        followInProcess: getFollowInProcess(state),
        searchFilter: getSearchFilter(state)
    }
}
export default compose<ComponentType>(
    withRedirectIfNoAuth,
    connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {handlingUsers, handlingFollowAction, handlingUnfollowAction})
)(UsersContainer)

