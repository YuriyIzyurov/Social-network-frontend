import React from "react";
import './App.scss';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainerHook";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {setInitializeThunkCreator} from "./redux/appReducer";
import Preloader from "./common/Preloader/Preloader";
import {WithLazyLoading} from "./components/HOC/withLazyLoading";
import {AppStateType} from "./redux/reduxStore";
import {HomeOutlined, MessageOutlined, CustomerServiceOutlined, TeamOutlined } from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import LoginPage from "./components/Login/LoginPage";
import Settings from "./components/Settings/Settings";
import ProfileInfo from "./components/Profile/ProfileInfo/ProfileInfo";
import MyPostContainer from "./components/Profile/MyPosts/MyPostContainer";
import {AnimatedSider} from "./components/Sidebar/AnimatedSider";
import PostPage from "./pages/Post/PostPage";




const LazyDialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const LazyChatContainer = React.lazy(() => import("./pages/Chat/ChatPage"))
const DialogsContainer =  WithLazyLoading(LazyDialogsContainer)
const ChatPage =  WithLazyLoading(LazyChatContainer)

const { Header, Content, Footer, Sider } = Layout

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
        <Layout className="site__layout">
            <BrowserRouter>
                <HeaderContainer/>
                <AnimatedSider />
            <Layout>
                <Header className="header">
                </Header>
                <Content className="site__layout-content">
                        <Routes>
                            <Route path="/" element={<MyPostContainer/>}/>
                            {/*<Route path="/dialogs/!*" element={<DialogsContainer/>}/>*/}
                            <Route path="/dialogs/:id" element={<DialogsContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/profile/:id" element={<MyPostContainer/>}/>
                            <Route path="/profile/" element={<MyPostContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="/music" element={<PostPage />}/>
                            <Route path="/post/:id" element={<PostPage />}/>
                            <Route path="*" element={<div> 404 NOT FOUND</div>}/>
                        </Routes>
                </Content>
            </Layout>
            <Sider className="site__layout-right-sider">
                <div className='profile__info'>
                    <ProfileContainer/>
                </div>
            </Sider>
            </BrowserRouter>
        </Layout>
        )
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {setInitializeThunkCreator})(App)
