import React from "react"
import UserItem from "./UserItem";
import s from './Users.module.css'

const Users = (props) => {
    if(props.users.length === 0) {
        props.showUsers([{
                name: "Boris",
                id: 9,
                followed: false,
                status: "Im fine now!",
                location: {country: "Belarus", city: "Minsk"},
                src: 'https://android-obzor.com/wp-content/uploads/2022/02/2-2-300x300.jpg'
            },
            {
                name: "Oleg",
                id: 10,
                followed: true,
                status: "Wish i be programmer",
                location: {country: "Ukraine", city: "Kharkiv"},
                src: 'https://android-obzor.com/wp-content/uploads/2022/02/8-2-300x180.jpg'
            },
            {
                name: "Andrew",
                id: 11,
                followed: false,
                status: "Putin xublot",
                location: {country: "Russia", city: "Ivanovo"},
                src: 'https://android-obzor.com/wp-content/uploads/2022/02/7-2-300x300.jpg'
            }])
    }
    let userList = props.users.map(n=> <UserItem name={n.name}
                                                id={n.id}
                                                src={n.src}
                                                followed={n.followed}
                                                status={n.status}
                                                location={n.location}
                                                pushFollow={props.pushFollow}
    />)
    return (
        <div>
            <div className={s.user}>
                {userList}
            </div>
        </div>
    )
}

export default Users
