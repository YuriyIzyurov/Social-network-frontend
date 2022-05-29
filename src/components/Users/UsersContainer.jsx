import {connect} from "react-redux";
import Users from "./Users";
import {
    followActionInProcess, followToggle, handlingUsers, handlingUsersOnPage
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../../common/Preloader/Preloader";


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
                                                                pushFollow={this.props.followToggle}
                                                                getUsersOnPage={this.getUsersOnPage}
                                                                setFollowInProcess={this.props.followActionInProcess}
                                                                followInProcess={this.props.followInProcess}
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

export default connect(mapStateToProps, {followToggle, followActionInProcess, handlingUsers, handlingUsersOnPage})(UsersContainer)
