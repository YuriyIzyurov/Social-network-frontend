import React from "react";
import  "./LoginWhiteBlock.scss"


type PropsType = {
    children: React.ReactNode
}
export const LoginWhiteBlock: React.FC<PropsType> = ({children}) => {
    return <div className="block">{children}</div>
}
export default LoginWhiteBlock