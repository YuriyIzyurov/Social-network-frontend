import {connect} from "react-redux";
import Users from "./Users";
import {followToggle, setActivePageAC, setUsers, totalUsersAC} from "../../redux/usersReducer";

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
const UsersContainer = connect(mapStateToProps, dispatchStateToProps)(Users)
export default UsersContainer