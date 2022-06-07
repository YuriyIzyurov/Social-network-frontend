
import {connect} from "react-redux";
import Login from "./Login";
import {askForCaptcha, sendAuthDataOnServ} from "../../redux/authReducer";


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, {sendAuthDataOnServ, askForCaptcha})(Login)

