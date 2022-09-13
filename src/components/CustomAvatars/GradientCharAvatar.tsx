import React from "react"
import {customAvatar} from "utils/Avatar/AvatarGenerator";
import './GradientCharAvatar.scss'

type PropsType = {
    avatarUrl:string | undefined
    name:string
    height?:string
}
export const GradientCharAvatar:React.FC<PropsType> = React.memo(({avatarUrl, name, height = '44px'}) => {

    if(avatarUrl) {
        return <img src={avatarUrl} width='44px' height='44px' alt="User"/>
    } else {
        const {mainColor, lightColor} = customAvatar(name)
        const firstChar = name[0].toUpperCase()
        return (
            <div
                className="gradient-avatar"
                style={{
                    background: `linear-gradient(135deg,${mainColor} 0%,${lightColor} 96.52%)`,
                    width: '44px',
                    height: `${height}`
                }}
            >
                {firstChar}
            </div>
        )}
})

