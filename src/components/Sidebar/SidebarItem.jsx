import React from "react"
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";

const SidebarItem = (props) => {
    return <div>
        <NavLink to={"/dialogs/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={props.src}/>
            <div>{props.name}</div>
        </NavLink>
    </div>
}

export default SidebarItem