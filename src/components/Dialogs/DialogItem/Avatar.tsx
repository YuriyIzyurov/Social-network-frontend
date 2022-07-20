import React from "react"
import {UserType} from "../../../typings/types";
import {customAvatar} from "../../../utils/Avatar/AvatarGenerator";
import  '../../Users/Users.scss'

const Avatar = ({user}:{user:UserType}) => {
    if(user.photos.small) {
        return <img src={user.photos.small} width='50px' height='50px'/>
    } else {
        const {mainColor, lightColor} = customAvatar(user.name)
        const firstChar = user.name[0].toUpperCase()
        return <div className="avatar" style={{background:`linear-gradient(135deg, ${mainColor} 0%, ${lightColor} 96.52%)`}}>{firstChar}</div>
    }

}


export default Avatar