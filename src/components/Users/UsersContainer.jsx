import {connect} from "react-redux";
import Users from "./Users";
import {
    dataIsFetching, followActionInProcess,
    followToggle,
    setActivePage, setTotalUsers,
    setUsers
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.dataIsFetching(true)
        usersAPI.getUsers(this.props.activePage, this.props.usersOnPage).then(data => {
            this.props.dataIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsers(data.totalCount)
        })
    }

    getUsersOnPage = (n) => {
        this.props.setActivePage(n)
        this.props.dataIsFetching(true)
        usersAPI.getUsers(this.props.activePage, this.props.usersOnPage).then(data => {
            this.props.dataIsFetching(false)
            this.props.setUsers(data.items)
        })
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

export default connect(mapStateToProps, {followToggle, setUsers, setActivePage, setTotalUsers, dataIsFetching, followActionInProcess})(UsersContainer)
