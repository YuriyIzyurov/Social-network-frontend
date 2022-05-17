import {connect} from "react-redux";
import Users from "./Users";
import {followToggle} from "../../redux/usersReducer";

const mapStateToProps = (state) => {

    return {
        users: state.userList.users
    }
}
const dispatchStateToProps = (dispatch) =>{
    return {
        pushFollow: (id) => dispatch(followToggle(id))
    }
}
const UsersContainer = connect(mapStateToProps, dispatchStateToProps)(Users)
export default UsersContainer