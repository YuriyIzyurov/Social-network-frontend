import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    userList: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<T extends {[key: string]: infer U} ? U : never>


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