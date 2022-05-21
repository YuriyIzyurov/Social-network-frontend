import {connect} from "react-redux";
import Users from "./Users";
import {followToggle, setActivePageAC, setUsers, totalUsersAC} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";


class UsersContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.usersOnPage}`).then(response => {

            this.props.showUsers(response.data.items)
            this.props.updateTotalUsers(response.data.totalCount)
        })
    }

    getUsersOnPage = (n) => {
        this.props.setActivePage(n)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${n}&count=${this.props.usersOnPage}`).then(response => {
            this.props.showUsers(response.data.items)
        })
    }

    render() {
        return (
            <div>
                  <Users totalUsers={this.props.totalUsers}
                         usersOnPage={this.props.usersOnPage}
                         activePage={this.props.activePage}
                         users={this.props.users}
                         pushFollow={this.props.pushFollow}
                         getUsersOnPage={this.getUsersOnPage}
                  />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.userList.users,
        totalUsers: state.userList.totalUsers,
        usersOnPage: state.userList.usersOnPage,
        activePage: state.userList.activePage
    }
}
const dispatchStateToProps = (dispatch) =>{
    return {
        pushFollow: (id) => dispatch(followToggle(id)),
        showUsers: (users) => dispatch(setUsers(users)),
        setActivePage: (page) => dispatch(setActivePageAC(page)),
        updateTotalUsers: (userCount) => dispatch(totalUsersAC(userCount))
    }
}
export default connect(mapStateToProps, dispatchStateToProps)(UsersContainer)
