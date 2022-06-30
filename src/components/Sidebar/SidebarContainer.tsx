import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import {AppStateType} from "../../redux/reduxStore";
import {UserType} from "../../typings/types";
import {getFriendsOnSidebar, ThunkType} from "../../redux/sidebarReducer";
import Preloader from "../../common/Preloader/Preloader";
import React, {ComponentType} from "react";
import {compose} from "redux";

type MapStateType = {
    friendList: Array<UserType>
    totalFriends: number
    usersOnPage: number
}
type DispatchPropsType = {
    getFriendsOnSidebar: (usersOnPage:number) => ThunkType
}

class SidebarContainer extends React.Component<MapStateType & DispatchPropsType> {

    componentDidMount() {
        this.props.getFriendsOnSidebar(this.props.usersOnPage)
    }

    render(){
        return <div>
            <Sidebar friendList = {this.props.friendList}/>
        </div>
    }

}
    const mapStateToProps = (state: AppStateType): MapStateType => {
        return {
            friendList: state.sidebar.friendList,
            totalFriends: state.sidebar.totalFriends,
            usersOnPage: state.sidebar.usersOnPage
        }
    }
export default compose<ComponentType>(connect<MapStateType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {getFriendsOnSidebar}))(SidebarContainer)
