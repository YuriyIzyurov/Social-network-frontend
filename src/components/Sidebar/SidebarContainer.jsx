import {connect} from "react-redux";
import Sidebar from "./Sidebar";

const mapStateToProps = (state) => {
    return {
        nameList: state.sidebar.nameList
    }
}
const dispatchStateToProps = (dispatch) =>{
    return {}
}
const SidebarContainer = connect(mapStateToProps, dispatchStateToProps)(Sidebar)
export default SidebarContainer