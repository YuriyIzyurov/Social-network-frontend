import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'
import axios from "axios";

class Users extends React.Component{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.usersOnPage}`).then(response => {

            this.props.showUsers(response.data.items)
            this.props.updateTotalUsers(response.data.totalCount)
        })
    }

    getUsersOnPage = (n) => {
        this.props.setActivePage(n)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${n}&count=${this.props.usersOnPage}`).then(response => {
            this.props.showUsers(response.data.items)
        })
    }

    render(){
        let pagesCount = Math.ceil(this.props.totalUsers/this.props.usersOnPage)
        let pages = []
        for(let i=1; i <= pagesCount; i++){
            pages.push(i)
        }
        let curP = this.props.activePage;
        let curPF = ((curP - 3) < 0) ?  0  : curP - 3 ;
        let curPL = curP + 3;
        let slicedPages = pages.slice( curPF, curPL);

        return (
            <div>
                <div>
                    {slicedPages.map(n=> <span onClick={()=>this.getUsersOnPage(n)} className={this.props.activePage === n && s.active}>{n}</span>)}
                </div>
                <div className={s.user}>
                    { this.props.users.map(n=> <UserItem name={n.name}
                                                    id={n.id}
                                                    photo={n.photos.large}
                                                    followed={n.followed}
                                                    status={n.status}
                                                    pushFollow={this.props.pushFollow} />)}
                </div>
            </div>
        )
    }
}

export default Users
