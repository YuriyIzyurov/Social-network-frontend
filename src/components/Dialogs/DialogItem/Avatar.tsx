
import React from "react"
import {UserType} from "typings/types";
import {customAvatar} from "utils/Avatar/AvatarGenerator";
import  '../../../pages/Users/Users.scss'
import ChatPage from "components/Chat/ChatPage";




const Avatar = React.memo(({user}:{user:UserType}) => {
    if(user.photos.small) {
        return <img src={user.photos.small} width='50px' height='50px'/>
    } else {
        const {mainColor, lightColor} = customAvatar(user.name)
        const firstChar = user.name[0].toUpperCase()
        return <div className="avatar" style={{background:`linear-gradient(135deg, ${mainColor} 0%, ${lightColor} 96.52%)`}}>{firstChar}</div>
    }

})


export default Avatar