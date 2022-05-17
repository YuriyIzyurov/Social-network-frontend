const FOLLOW = "FOLLOW"

let initialState = {users: [
        {name: "Boris", id: 9, followed: false, status: "Im fine now!", location: {country: "Belarus", city: "Minsk"}, src:'https://android-obzor.com/wp-content/uploads/2022/02/2-2-300x300.jpg'},
        {name: "Oleg", id: 10, followed: true, status: "Wish i be programmer", location: {country: "Ukraine", city: "Kharkiv"}, src:'https://android-obzor.com/wp-content/uploads/2022/02/8-2-300x180.jpg'},
        {name: "Andrew", id: 11, followed: false, status: "Putin xublot", location: {country: "Russia", city: "Ivanovo"}, src:'https://android-obzor.com/wp-content/uploads/2022/02/7-2-300x300.jpg'}]}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item=>{
                    return item.id === action.userID ? {...item, followed: !item.followed} : item
                })
            }
        default:
            return state
    }



}

export const followToggle = (userID) => ({type : FOLLOW, userID})
export default usersReducer
