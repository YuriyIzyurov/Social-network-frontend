import React from "react"
import {customAvatar} from "utils/Avatar/AvatarGenerator";
import './GradientCharAvatar.scss'


const GradientCharAvatar = React.memo(({avatarUrl, name}:{avatarUrl:string | undefined, name:string}) => {

    if(avatarUrl) {
        return <img src={avatarUrl} width='44px' height='44px'/>
    } else {
        const {mainColor, lightColor} = customAvatar(name)
        const firstChar = name[0].toUpperCase()
        return (
            <div
                className="gradient-avatar"
                style={{
                    background: `linear-gradient(135deg,${mainColor} 0%,${lightColor} 96.52%)`,
                    width: '44px',
                    height: '44px'
                }}
            >
                {firstChar}
            </div>
        )}
})

export default GradientCharAvatar