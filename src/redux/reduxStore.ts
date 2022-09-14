import {Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import {appReducer, usersReducer, authReducer, chatReducer, postsReducer, authBlogReducer, dialogReducer, profileReducer } from "redux/Reducers";
import { useDispatch} from "react-redux";


let rootReducer = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    userList: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    blog: postsReducer,
    blogAuth: authBlogReducer
})
export type AppDispatch = ThunkDispatch<AppStateType, any, AppAction>
type AppAction = ReturnType<typeof store.dispatch>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppStateType = ReturnType<typeof rootReducer>


export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<T extends {[key: string]: infer U} ? U : never>
export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
        store: any
    }
}
const MiddleWare: ThunkMiddleware<AppStateType, AnyAction> = thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(MiddleWare)))

export default store