import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
let reducers = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    userList: usersReducer,
    auth: authReducer,
    form: formReducer
})
let store = legacy_createStore(reducers, applyMiddleware(thunk))
window.store = store
export default store