
import {connect} from "react-redux";
import Login from "./Login";
import {askForCaptcha, sendAuthDataOnServ, ThunkType} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

export type StatePropsLoginType ={
    isAuth: boolean
    captcha: string | null
}

export type DispatchPropsLoginType = {
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string) => ThunkType
    askForCaptcha: () => ThunkType
}
let mapStateToProps = (state: AppStateType): StatePropsLoginType  => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect<StatePropsLoginType, {}, {}, AppStateType>(mapStateToProps, {sendAuthDataOnServ, askForCaptcha})(Login)

