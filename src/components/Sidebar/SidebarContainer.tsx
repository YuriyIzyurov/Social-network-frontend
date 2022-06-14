import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import {AppStateType} from "../../redux/reduxStore";
import {ArrayOfUsersType, DialogDataType} from "../../typings/types";


const mapStateToProps = (state:AppStateType):ArrayOfUsersType => {
    return {
        nameList: state.sidebar.nameList
    }
}

const SidebarContainer = connect<ArrayOfUsersType, {}, {}, AppStateType>(mapStateToProps)(Sidebar)
export default SidebarContainer