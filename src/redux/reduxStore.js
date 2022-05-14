import {combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import postReducer from "./postReducer";
import sidebarReducer from "./sidebarReducer";
let reducers = combineReducers({
    dialog: dialogReducer,
    post: postReducer,
    sidebar: sidebarReducer
})
let store = legacy_createStore(reducers)

export default store