import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
let reducers = combineReducers({
    dialog: dialogReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    userList: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunk)))


window.__store__ = store
export default store