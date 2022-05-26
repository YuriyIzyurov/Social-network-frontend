import React from "react"
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) =>{
debugger
    return <header className={s.header}>
        <img src='https://i.pinimg.com/originals/aa/25/53/aa2553cff08a5d436961d343b832007d.jpg'/>
        <div className={s.loginBlock}>
            {!props.isAuth ? <NavLink to={'/login'}>Login</NavLink> : <div>{props.login}!!!</div>}

        </div>
    </header>
}

export default Header