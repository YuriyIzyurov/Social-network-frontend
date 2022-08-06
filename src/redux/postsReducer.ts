import {AddPostType, PostType} from "../typings/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {postsAPI} from "../api/postsAPI";

export type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionsTypes<typeof actions>
type initialStateType = typeof initialState

let initialState = {
    posts: [] as Array<PostType>,
    isFetching: false
}

const postsReducer = (state = initialState, action: ActionType ):initialStateType => {
    switch (action.type) {
        case 'SET_ALL_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        case 'POSTS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}
export const getAllPosts = ():ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        const response = await postsAPI.getPosts()
        dispatch(actions.setFetching(false))
        dispatch(actions.setAllPosts(response))
    }
}
export const publicPost = (post: AddPostType):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        const response = await postsAPI.writePost(post)
        dispatch(actions.setFetching(false))
        console.log(response)
    }
}

export const actions = {
    setAllPosts: (posts: PostType[]) => ({type: 'SET_ALL_POSTS', payload: posts} as const),
    setFetching: (isFetching: boolean) => ({type: 'POSTS_FETCHING', isFetching} as const)
}



export default postsReducer