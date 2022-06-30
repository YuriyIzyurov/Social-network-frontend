import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer, { ThunkType } from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import {ThunkAction} from "redux-thunk/es/types";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

let rootReducer = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    userList: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof rootReducer>
export type TypedDispatch = ThunkDispatch<AppStateType, any, Action>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, Action>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<T extends {[key: string]: infer U} ? U : never>
export type BaseThunkType<A extends Action,R = void> = ThunkAction<R, AppStateType, unknown, A>
//export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> был такой вариант


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any,
        store: any
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// @ts-ignore
window.__store__ = store
export default store