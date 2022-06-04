import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'



const Paginator = ({totalUsers, usersOnPage, activePage, getUsersOnPage  }) => {

    let pagesCount = Math.ceil(totalUsers / usersOnPage)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP = activePage
    let curPF = ((curP - 3) < 0) ? 0 : curP - 3
    let curPL = curP + 3
    let slicedPages = pages.slice(curPF, curPL)

    return (
        <div>
            <div>
                {slicedPages.map(n => <span onClick={() => {
                    getUsersOnPage(n)}}
                                            className={activePage === n && s.active}>{n}</span>)}
            </div>
        </div>
    )
}
export default Paginator
