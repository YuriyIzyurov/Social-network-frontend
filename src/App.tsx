import React from "react";
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersContainer from "./pages/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "pages/Login/LoginPage/LoginPageContainer";
import {connect} from "react-redux";
import {setInitializeThunkCreator} from "redux/appReducer";
import Preloader from "./common/Preloader/Preloader";
import {WithLazyLoading} from "components/HOC/withLazyLoading";
import {AppStateType} from "redux/reduxStore";
import {Layout} from 'antd';
import {AnimatedSider} from "components/Sidebars/LeftSidebar/AnimatedSider";
import PostsPage from "pages/Posts/PostsPage/PostsPage";
import PostFull from "pages/Posts/Post/PostFull/PostFull";
import Test from "./components/Test";
import HeaderRouter from "./components/Header/HeaderRouter";
import ProfilePosts from "pages/Posts/ProfilePage/ProfilePosts";
import ProfileInfo from "components/Sidebars/RightSidebar/ProfileInfo";


const LazyDialogsContainer = React.lazy(() => import("pages/Dialogs/DialogsPage/DialogsPageContainer"))
const LazyChatContainer = React.lazy(() => import("./components/Chat/ChatPage"))
const DialogsContainer =  WithLazyLoading(LazyDialogsContainer)
const ChatPage =  WithLazyLoading(LazyChatContainer)

const { Header, Content, Footer, Sider } = Layout

type StatePropsAppType = ReturnType<typeof mapStateToProps>
type DispatchPropsAppType = {
    setInitializeThunkCreator: () => any
}
class App extends React.Component<StatePropsAppType & DispatchPropsAppType> {
    catchAllErrors = (err: any) => {
        console.log(err)
        //alert("Something go wrong, try again")
        //alert(err)
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
                    <HeaderRouter/>
                </Header>
                <Content className="site__layout-content">
                        <Routes>
                            {/*<Route path="/dialogs/!*" element={<DialogsContainer/>}/>*/}
                            <Route path="/dialogs/:id" element={<DialogsContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/profile/:id" element={<ProfilePosts/>}/>
                            <Route path="/profile/" element={<ProfilePosts/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="/posts/:id" element={<PostFull/>}/>
                            <Route path="/posts" element={<PostsPage />}/>
                            <Route path="/" element={<ProfilePosts/>}/>
                            <Route path="/test" element={<Test/>}/>
                            <Route path="/author/:id" element={<PostsPage />}/>
                            <Route path="*" element={<div> 404 NOT FOUND</div>}/>
                        </Routes>
                </Content>
            </Layout>
            </BrowserRouter>
                {this.props.isAuth && <Sider className="site__layout-right-sider">
                    <div className='profile__info'>
                        <ProfileInfo/>
                    </div>
                </Sider>}
        </Layout>
        )
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth && state.blogAuth.isAuth
})

export default connect(mapStateToProps, {setInitializeThunkCreator})(App)
