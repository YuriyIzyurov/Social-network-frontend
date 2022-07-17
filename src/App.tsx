import React from "react";
import './App.css';
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
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import LoginPage from "./components/Login/LoginPage";
import Settings from "./components/Settings/Settings";



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
        /*const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
            key,
            label: `nav ${key}`,
        }));*/

        const items2: MenuProps['items'] = [{
            key: `sub1`,
            icon: React.createElement(UserOutlined),
            label: <NavLink to="/profile">Profile</NavLink>,
            children: [{
                key: 1,
                label: <NavLink to="/dialogs">Messages</NavLink>,
            }, {
                key: 2,
                label: <NavLink to="/music">My music</NavLink>,
            }, {
                key: 3,
                label: <NavLink to="/settings">Settings</NavLink>,
            } ]
        }, {
            key: `sub2`,
            icon: React.createElement(LaptopOutlined),
            label: `Friends`,
            children: [{
                key: 4,
                label: <NavLink to="/users">Find friends</NavLink>,
            }, {
                key: 5,
                label: <NavLink to="/news">News</NavLink>,
            }, {
                key: 6,
                label: <NavLink to="/chat">Chat</NavLink>,
                }]
        }]

        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout style={{ height: "100vh" }}>
                <BrowserRouter>
                    <Header className="header">
                        <div className="logo" />
                        <HeaderContainer/>
                       {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    //defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                    items={items2}
                                />
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Routes>
                                    <Route path="/" element={<ProfileContainer/>}/>
                                    {/*<Route path="/dialogs/!*" element={<DialogsContainer/>}/>*/}
                                    <Route path="/dialogs/:id" element={<DialogsContainer/>}/>
                                    <Route path="/dialogs" element={<DialogsContainer/>}/>
                                    <Route path="/profile/:id" element={<ProfileContainer/>}/>
                                    <Route path="/profile/" element={<ProfileContainer/>}/>
                                    <Route path="/news" element={<News/>}/>
                                    <Route path="/music" element={<Music/>}/>
                                    <Route path="/settings" element={<Settings/>}/>
                                    <Route path="/users" element={<UsersContainer/>}/>
                                    <Route path="/login" element={<LoginContainer/>}/>
                                    <Route path="/chat" element={<ChatPage />}/>
                                    <Route path="*" element={<div> 404 NOT FOUND</div>}/>
                                </Routes>
                            </Content>
                        </Layout>
                    </Content>
                    {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </BrowserRouter>
            </Layout>
            /*
                <div className='app-wrapper'>
                    <HeaderContainer/>

                    <div className='app-wrapper-content'>

                    </div>
                </div>
            */
        )
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {setInitializeThunkCreator})(App)
