import React from "react"
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar/avatar";
import {PhotosType} from "../../typings/types";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    photos?: PhotosType
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, photos, logoutFromServer }) =>{
debugger
    return <header className={s.header}>
        <img src='https://i.pinimg.com/originals/aa/25/53/aa2553cff08a5d436961d343b832007d.jpg'/>
        <div className={s.loginBlock}>
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                : <div>
                    <div>
                        <Avatar src={photos?.small} />
                        {login}
                        <Button onClick={()=>{logoutFromServer()}}>Logout</Button>
                    </div>
                </div>
            }
        </div>
    </header>
}

export default Header