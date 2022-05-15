import React from "react"
import s from './Sidebar.module.css'

import SidebarItem from "./SidebarItem";

const Sidebar = (props) => {

    let userOnline = props.nameList.map(n=><SidebarItem name={n.name} id={n.id}  src={n.src}/>)
    return (
        <div>
            <div className={s.item}>
                Friends
            </div>
            <div className={s.user}>
                {userOnline}
            </div>
        </div>
    )
}

export default Sidebar
