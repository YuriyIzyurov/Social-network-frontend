import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'


const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsers / props.usersOnPage)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = props.activePage
    let curPF = ((curP - 3) < 0) ? 0 : curP - 3
    let curPL = curP + 3
    let slicedPages = pages.slice(curPF, curPL)

    return (
        <div>
            <div>
                {slicedPages.map(n => <span onClick={() => props.getUsersOnPage(n)}
                                            className={props.activePage === n && s.active}>{n}</span>)}
            </div>
            <div className={s.user}>
                {props.users.map(n => <UserItem name={n.name}
                                                     id={n.id}
                                                     photo={n.photos.large}
                                                     followed={n.followed}
                                                     status={n.status}
                                                     pushFollow={props.pushFollow}/>)}
            </div>
        </div>
    )
}
export default Users
