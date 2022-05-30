import {connect} from "react-redux";
import Users from "./Users";
import {
    handlingFollowAction,
    handlingUnfollowAction,
    handlingUsers,
    handlingUsersOnPage
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.handlingUsers(this.props.activePage, this.props.usersOnPage)
    }

    getUsersOnPage = (n) => {
        this.props.handlingUsersOnPage(n, this.props.activePage, this.props.usersOnPage)
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
const mapStateToProps = (state) => {
    return {
        users: state.userList.users,
        totalUsers: state.userList.totalUsers,
        usersOnPage: state.userList.usersOnPage,
        activePage: state.userList.activePage,
        isFetching: state.userList.isFetching,
        followInProcess: state.userList.followInProcess
    }
}
export default compose(
    withRedirectIfNoAuth,
    connect(mapStateToProps, {handlingUsers, handlingUsersOnPage, handlingFollowAction, handlingUnfollowAction})
)(UsersContainer)

