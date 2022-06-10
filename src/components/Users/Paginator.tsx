import React from "react"
import s from './Users.module.css'

type PropsType = {
    totalUsers: number
    usersOnPage: number
    activePage: number
    getUsersOnPage: (n:number) => void
}

const Paginator: React.FC<PropsType> = ({totalUsers, usersOnPage, activePage, getUsersOnPage  }) => {

    let pagesCount: number = Math.ceil(totalUsers / usersOnPage)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let curP: number = activePage
    let curPF: number = ((curP - 3) < 0) ? 0 : curP - 3
    let curPL: number = curP + 3
    let slicedPages: Array<number> = pages.slice(curPF, curPL)

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
