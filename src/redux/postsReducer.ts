import {AddPostType, PostType} from "../typings/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {postsAPI} from "../api/postsAPI";

export type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionsTypes<typeof actions>
type initialStateType = typeof initialState

let initialState = {
    posts: [] as Array<PostType>,
    isFetching: false,
    id: null as string | null
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
        case 'SET_POST_ID':
            return {
                ...state,
                id: action.id
            }
        case 'DELETE_POST_ID':
            return {
                ...state,
                id: null
            }
        case 'SORT_POSTS':
            return {
                ...state,
                posts: [...state.posts.filter(item => item._id !== action.id)]
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
export const publicPost = (post: AddPostType, id: string | null = null):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        if(id) {
            const response = await postsAPI.updatePost(post, id)
            if(response.resultCode === 0) {
                dispatch(actions.setCreatedPostId(response._id))
            } else console.log(response)
        } else {
            const response = await postsAPI.writePost(post)
            if(response.resultCode === 0) {
                dispatch(actions.setCreatedPostId(response.data._id))
            }
        }
        dispatch(actions.setFetching(false))

    }
}
export const deletePublication = (id:string):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setFetching(true))
        const response = await postsAPI.deletePost(id)
        dispatch(actions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(actions.deletePostFromState(id))
        } else if(response.resultCode === 1) {
                alert("Статья не найдена")
            } else console.log("Проверь респонс, допиши бэк")
    }
}

export const actions = {
    setAllPosts: (posts: PostType[]) => ({type: 'SET_ALL_POSTS', payload: posts} as const),
    setFetching: (isFetching: boolean) => ({type: 'POSTS_FETCHING', isFetching} as const),
    setCreatedPostId: (id: string) => ({type: 'SET_POST_ID', id} as const),
    deleteCreatedPostId: () => ({type: 'DELETE_POST_ID'} as const),
    deletePostFromState: (id: string) => ({type: 'SORT_POSTS', id} as const)
}



export default postsReducer