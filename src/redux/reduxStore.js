import {combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
let reducers = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    userList: usersReducer
})
let store = legacy_createStore(reducers)
window.store = store
export default store