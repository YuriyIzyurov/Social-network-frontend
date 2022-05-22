import {connect} from "react-redux";
import Users from "./Users";
import {
    dataIsFetching,
    followToggle,
    setActivePage, setTotalUsers,
    setUsers
} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";
import Preloader from "../../common/Preloader/Preloader";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.dataIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.usersOnPage}`).then(response => {
            this.props.dataIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsers(response.data.totalCount)
        })
    }

    getUsersOnPage = (n) => {
        this.props.setActivePage(n)
        this.props.dataIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${n}&count=${this.props.usersOnPage}`).then(response => {
            this.props.dataIsFetching(false)
            this.props.setUsers(response.data.items)
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
        isFetching: state.userList.isFetching
    }
}

export default connect(mapStateToProps, {followToggle, setUsers, setActivePage, setTotalUsers, dataIsFetching})(UsersContainer)
