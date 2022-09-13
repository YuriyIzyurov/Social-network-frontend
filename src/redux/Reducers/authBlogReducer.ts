import {authBlogAPI} from "api/postsAPI";
import {BaseThunkType, InferActionsTypes} from "redux/reduxStore";

type ActionType = InferActionsTypes<typeof actions>
export type ThunkBlogType = BaseThunkType<ActionType>
type initialStateType = typeof initialState

let initialState = {
    email: null as string | null,
    id: null as string | null,
    fullName: null as string | null,
    avatarUrl: null as string | null,
    isAuth: false as boolean | false,
    errorBlog:null as string | null,
}

const authBlogReducer = (state = initialState, action: ActionType):initialStateType => {
    switch(action.type) {
        case "BLOG_LOGIN_USER":
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case "BLOG_LOGOUT":
            return {
                email: null,
                id: null,
                fullName: null,
                avatarUrl: null,
                isAuth: false,
                errorBlog: null
            }
        case "SET_BLOG_AVATAR":
            return {
                ...state,
                avatarUrl: action.avatarUrl
            }
        case "ERROR_MESSAGE_BLOG":
            return {
                ...state,
                errorBlog: action.message
            }
        default: return state
    }
}



export const handlingBlogUserAuth = (email: string, password: string): ThunkBlogType => {
    return async (dispatch) => {
        let response = await authBlogAPI.submitAuth(email, password)
        if(response.data._id) {
            const {_id, fullName, email, avatarUrl} = response.data
            dispatch(actions.setBlogUserAuth({email: email, id: _id, fullName: fullName, avatarUrl}))
            const {token} = response.data
            window.localStorage.setItem('token', token)
        }
    }
}
export const handlingAuthDataBlog = ():ThunkBlogType => {

    return async (dispatch) => {
        try {
            let response = await authBlogAPI.getMe()
            if(response.resultCode === 0) {
                const {_id, fullName, email, avatarUrl} = response.data
                dispatch(actions.setBlogUserAuth({email, id: _id, fullName, avatarUrl}))
            } else if(response.resultCode === 1) {
                console.log(response.message)
            }
        } catch (e) {
            dispatch(actions.incorrectData('Blog database is unavailable'))
            throw new Error('Connecting to database')
        }
    }
}
export const handlingBlogUserLogout = ():ThunkBlogType => {
    return async (dispatch) => {
        dispatch(actions.logoutBlogUserAuth())
        window.localStorage.removeItem('token')
    }
}
export const handlingChangeAvatar = (file: File):ThunkBlogType => {
    return async (dispatch) => {
        let response = await authBlogAPI.uploadAvatar(file)
        if(response.resultCode === 0) {
            dispatch(actions.setAvatar(response.data.avatarUrl))
        }
    }
}

const actions = {
    setBlogUserAuth: (payload: any) => ({type:"BLOG_LOGIN_USER", payload} as const),
    logoutBlogUserAuth: () => ({type:"BLOG_LOGOUT"} as const),
    setAvatar: (avatarUrl: string) => ({type:"SET_BLOG_AVATAR", avatarUrl} as const),
    incorrectData: (message: string) => ({type : "ERROR_MESSAGE_BLOG", message} as const),
}
export default authBlogReducer
