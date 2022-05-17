import {combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import postReducer from "./postReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
let reducers = combineReducers({
    dialog: dialogReducer,
    post: postReducer,
    sidebar: sidebarReducer,
    userList: usersReducer
})
let store = legacy_createStore(reducers)

export default store