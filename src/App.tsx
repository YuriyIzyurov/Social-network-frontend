import React from "react";
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {setInitializeThunkCreator} from "redux/Reducers/appReducer";
import {WithLazyLoading} from "components/HOC";
import {AppStateType} from "redux/reduxStore";
import {Layout, Spin} from 'antd';
import HeaderRouter from "./components/Header/HeaderRouter";
import {ProfileInfo, AnimatedSider} from "components/Main";

const LazyDialogsContainer = React.lazy(() => import("pages/Dialogs/DialogsPage/DialogsPageContainer"))
const LazyChatContainer = React.lazy(() => import("./components/Main/Chat/ChatPage"))
const LazyLoginContainer = React.lazy(() => import("pages/Login/LoginPageContainer"))
const LazyPostsPage = React.lazy(() => import("pages/Posts/PostsPage/PostsPage"))
const LazyProfilePosts = React.lazy(() => import("pages/Posts/ProfilePage/ProfilePosts"))
const LazyUsersContainer = React.lazy(() => import("pages/Users/UsersContainer"))
const LazyPostFull = React.lazy(() => import("pages/Posts/Post/PostFull/PostFull"))
const LazyErrorPage = React.lazy(() => import("./components/Main/Errors/ErrorPage"))

const DialogsContainer =  WithLazyLoading(LazyDialogsContainer)
const LoginContainer =  WithLazyLoading(LazyLoginContainer)
const PostsPage =  WithLazyLoading(LazyPostsPage)
const ProfilePosts =  WithLazyLoading(LazyProfilePosts)
const UsersContainer =  WithLazyLoading(LazyUsersContainer)
const PostFull =  WithLazyLoading(LazyPostFull)
const ErrorPage =  WithLazyLoading(LazyErrorPage)
export const ChatPage =  WithLazyLoading(LazyChatContainer)


const { Header, Content, Sider } = Layout

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
        if(!this.props.initialized && !this.props.socialError && !this.props.blogError) {
            return (
                <div className='main-spin'>
                    <Spin  size="large" />
                </div>
            )}
        if(this.props.blogError || this.props.socialError) {
            return <ErrorPage/>
        }

        return (
        <Layout className="site__layout">
            <BrowserRouter>
                <HeaderContainer/>
                <AnimatedSider isAuth={this.props.isAuth}/>
            <Layout>
                <Header className="header">
                    <HeaderRouter/>
                </Header>
                <Content className="site__layout-content">
                        <Routes>
                            <Route path="/dialogs/:id" element={<DialogsContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/profile/:id" element={<ProfilePosts/>}/>
                            <Route path="/profile/" element={<ProfilePosts/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="/posts/:id" element={<PostFull/>}/>
                            <Route path="/posts" element={<PostsPage />}/>
                            <Route path="/" element={<ProfilePosts/>}/>
                            <Route path="/author/:id" element={<PostsPage />}/>
                            <Route path="*" element={<div> 404 NOT FOUND</div>}/>
                        </Routes>
                </Content>
            </Layout>
            </BrowserRouter>
                 <Sider className="site__layout-right-sider">
                     <ProfileInfo/>
                </Sider>
        </Layout>
        )
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth && state.blogAuth.isAuth,
    socialError: state.auth.error,
    blogError: state.blogAuth.errorBlog
})

export default connect(mapStateToProps, {setInitializeThunkCreator})(App)
