const FOLLOW = "FOLLOW"
const SET_USERS = "SET_USERS"
const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE"
const SET_TOTAL_USERS = "SET_TOTAL_USERS"

let initialState = {users: [ ],
                    totalUsers: 0,
                    usersOnPage: 5,
                    activePage: 1}


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
                users: action.users
            }
        case SET_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.activePage
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        default:
            return state
    }

}

export const followToggle = (userID) => ({type : FOLLOW, userID})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setActivePageAC = (activePage) => ({type: SET_ACTIVE_PAGE, activePage})
export const totalUsersAC = (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers})
export default usersReducer
