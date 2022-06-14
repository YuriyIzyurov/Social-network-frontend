import React from "react"
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "./Avatar";
import {DialogDataType} from "../../../typings/types";


const DialogItem: React.FC<DialogDataType>= ({id, src, name}) => {

    return <div>
        <NavLink to={"/dialogs/" + id} className={navData => navData.isActive ? s.active : s.dialog}><Avatar src={src}/>{name}</NavLink>
    </div>
}


export default DialogItem