import React from "react"

import {NavLink} from "react-router-dom";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar/avatar";
import {PhotosType} from "../../typings/types";


type PropsLoginType = {
    isAuth: boolean
    login: string | null
    logoutFromServer: () => void
    photo: string | null | undefined
}
const Header: React.FC<PropsLoginType> = React.memo(({isAuth, login, photo, logoutFromServer }) =>{

    return <header >
        <div >
            {!isAuth ? <NavLink to={'/login'}>Login</NavLink>
                : <div>
                    <div>
                        <Avatar src={photo} />
                        {login}
                        <Button onClick={()=>{logoutFromServer()}}>Logout</Button>
                    </div>
                </div>
            }
        </div>
    </header>
})

export default Header