const FOLLOW = "FOLLOW"
const SET_USERS = "SET_USERS"

let initialState = {users: []}


const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item=>{
                    return item.id === action.userID ? {...item, followed: !item.followed} : item
                })
            }
        case SET_USERS:

            return {
                 ...state,
                users: [...state.users,...action.users ]
            }
        default:
            return state
    }

}

export const followToggle = (userID) => ({type : FOLLOW, userID})
export const setUsers = (users) => ({type: SET_USERS,users})
export default usersReducer
