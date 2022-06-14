import React from "react"
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
}
const Header: React.FC<PropsLoginType> = ({isAuth, login, logoutFromServer }) =>{

    return <header className={s.header}>
        <img src='https://i.pinimg.com/originals/aa/25/53/aa2553cff08a5d436961d343b832007d.jpg'/>
        <div className={s.loginBlock}>
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                : <div>
                    <div>
                        {login}
                    </div>
                    <div>
                        <button onClick={()=>{logoutFromServer()}}>Logout</button>
                    </div>
                </div>
            }
        </div>
    </header>
}

export default Header