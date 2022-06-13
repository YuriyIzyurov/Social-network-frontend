
import {connect} from "react-redux";
import Login from "./Login";
import {ActionType, askForCaptcha, sendAuthDataOnServ} from "../../redux/authReducer";
import {AppStateType, BaseThunkType} from "../../redux/reduxStore";

export type StatePropsLoginType ={
    isAuth: boolean
    captcha: string | null
}
export type DispatchPropsLoginType = {
    sendAuthDataOnServ: (email:string, password:string, rememberMe:boolean, captcha:string) => ThunkType
    askForCaptcha: () => ThunkType
}
type ThunkType = BaseThunkType<ActionType>
let mapStateToProps = (state: AppStateType): StatePropsLoginType  => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect<StatePropsLoginType, {}, {}, AppStateType>(mapStateToProps, {sendAuthDataOnServ, askForCaptcha})(Login)

