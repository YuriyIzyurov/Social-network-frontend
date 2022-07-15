import React from "react"
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import Avatar from "../Dialogs/DialogItem/Avatar";
import {DialogDataType, PhotosType} from "../../typings/types";
import userDefaultPhoto from "../../assets/images/personal-user.png";
import {ThunkType} from "../../redux/sidebarReducer";


type PropsType = {
    name: string
    id: number
    photos: PhotosType
}
const SidebarItem: React.FC<PropsType> = ({name, id, photos}) => {

    return <div>
        <NavLink to={"/profile/" + id} className={navData => navData.isActive ? s.active : s.dialog}>
           {/* <Avatar src={photos.large !== null ? photos.large : userDefaultPhoto }/>*/}
            <div>{name}</div>
        </NavLink>
    </div>
}

export default SidebarItem