import {Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer, { ThunkType } from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import appReducer from "./appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import chatReducer from "./chatReducer";
import postsReducer from "./postsReducer";
import authBlogReducer from "./authBlogReducer";

let rootReducer = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
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
//export type TypedDispatch = ThunkDispatch<AppStateType, any, Action>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, Action>
//export const useTypedDispatch: () => AppDispatch = useDispatch
//export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<T extends {[key: string]: infer U} ? U : never>
//export type BaseThunkType<A extends Action,R = void> = ThunkAction<R, AppStateType, unknown, A>
export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> //был такой вариант


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
        store: any
    }
}
const MiddleWare: ThunkMiddleware<AppStateType, AnyAction> = thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(MiddleWare)))

// @ts-ignore
window.__store__ = store
export default store