import React, { ComponentType, LazyExoticComponent } from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {setInitializeThunkCreator} from "./redux/appReducer";
import Preloader from "./common/Preloader/Preloader";
import {WithLazyLoading} from "./components/HOC/withLazyLoading";
import {AppStateType} from "./redux/reduxStore";

let LazyDialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
let DialogsContainer =  WithLazyLoading(LazyDialogsContainer)


type StatePropsAppType = ReturnType<typeof mapStateToProps>
type DispatchPropsAppType = {
    setInitializeThunkCreator: () => any
}
class App extends React.Component<StatePropsAppType & DispatchPropsAppType> {
    catchAllErrors = () => {
        alert("Something go wrong, try again")
    }
    componentDidMount() {
        this.props.setInitializeThunkCreator()
        window.addEventListener("unhandledrejection",this.catchAllErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection",this.catchAllErrors)
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path="/" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/profile/:id" element={<ProfileContainer/>}/>
                            <Route path="/profile/" element={<ProfileContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="*" element={<div> 404 NOT FOUND</div>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {setInitializeThunkCreator})(App)
