import React from "react"
import s from './Sidebar.module.css'

import SidebarItem from "./SidebarItem";
import {ArrayOfUsersType} from "../../typings/types";


const Sidebar: React.FC<ArrayOfUsersType> = ({nameList}) => {

    let userOnline = nameList.map(n=><SidebarItem name={n.name} id={n.id} key={n.name} src={n.src}/>)
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
