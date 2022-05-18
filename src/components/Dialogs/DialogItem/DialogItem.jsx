import React from "react"
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "./Avatar";


const DialogItem = (props) => {
    debugger
    return <div>
        <NavLink to={"/dialogs/" + props.id} className={navData => navData.isActive ? s.active : s.dialog}><Avatar src={props.src}/>{props.name}</NavLink>
    </div>
}


export default DialogItem