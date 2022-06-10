import React from "react"

const Avatar: React.FC<{src:any}> = ({src}) => {
    return <img src={src} width='65px' height='65px' />
}


export default Avatar