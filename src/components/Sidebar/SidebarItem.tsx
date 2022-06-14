import React from "react"
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import {DialogDataType} from "../../typings/types";


const SidebarItem: React.FC<DialogDataType> = ({name, id, src}) => {

    return <div>
        <NavLink to={"/dialogs/" + id} className={navData => navData.isActive ? s.active : s.dialog}>
            <Avatar src={src}/>
            <div>{name}</div>
        </NavLink>
    </div>
}

export default SidebarItem