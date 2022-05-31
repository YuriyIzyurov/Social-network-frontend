
import {connect} from "react-redux";
import Login from "./Login";
import {sendAuthDataOnServ} from "../../redux/authReducer";


let mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {sendAuthDataOnServ})(Login)

