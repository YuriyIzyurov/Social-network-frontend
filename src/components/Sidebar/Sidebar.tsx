import React from "react"
import s from './Sidebar.module.css'

import SidebarItem from "./SidebarItem";
import {UserType} from "../../typings/types";


type PropsType = {
    friendList: Array<UserType>
}
const Sidebar: React.FC<PropsType> = ({friendList}) => {

    let friendsOnSidebar = friendList.map(n=><SidebarItem  name={n.name} id={n.id} key={n.name} photos={n.photos}/>)
    return (
        <div>
            <div className={s.item}>
                Friends
            </div>
            <div className={s.user}>
                {friendsOnSidebar}
            </div>
        </div>
    )
}

export default Sidebar
