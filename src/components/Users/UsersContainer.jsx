import {connect} from "react-redux";
import Users from "./Users";
import {followToggle, setUsers} from "../../redux/usersReducer";

const mapStateToProps = (state) => {

    return {
        users: state.userList.users
    }
}
const dispatchStateToProps = (dispatch) =>{
    return {
        pushFollow: (id) => dispatch(followToggle(id)),
        showUsers: (users) => dispatch(setUsers(users))
    }
}
const UsersContainer = connect(mapStateToProps, dispatchStateToProps)(Users)
export default UsersContainer