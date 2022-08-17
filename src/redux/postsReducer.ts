import {AddPostType, PostType} from "typings/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {postsAPI} from "api/postsAPI";

export type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionsTypes<typeof actions>
type initialStateType = typeof initialState

let initialState = {
    posts: [] as Array<PostType>,
    isFetching: false as boolean | false,
    id: null as string | null,
    totalCount: null as number | null,
    activePage: 1,
    postsOnPage: 5,
    searchFilter: null as string | null,
}

const postsReducer = (state = initialState, action: ActionType ):initialStateType => {
    switch (action.type) {
        case 'SET_ALL_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        case 'ADD_POSTS':
            return {
                ...state,
                posts:[...state.posts, ...action.payload]
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
        case 'SET_POSTS_COUNT':
            return {
                ...state,
                totalCount: action.count
            }
        case 'SET_ACTIVE_POST_PAGE':
            return {
                ...state,
                activePage: action.page
            }
        case 'ADD_POST_SEARCH_FILTER':
            return {
                ...state,
                searchFilter:action.filter
            }
        default:
            return state
    }
}
export const getAllPosts = (searchFilter:string|null = null):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setActivePostPage(1))
        dispatch(actions.setFetching(true))
        const response = await postsAPI.getPosts(searchFilter)
        dispatch(actions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(actions.setAllPosts(response.posts))
            dispatch(actions.setTotalPosts(response.totalCount))
        } else {
            console.log('Smthng go wrong')
        }
    }
}
export const handlingAddPosts = (page:number, limit:number, searchFilter:string|null = null):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setActivePostPage(page))
        dispatch(actions.setFetching(true))
        const response = await postsAPI.getPosts(searchFilter, page, limit)
        dispatch(actions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(actions.addPosts(response.posts))
        } else {
            console.log('Smthng go wrong')
        }
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
    deletePostFromState: (id: string) => ({type: 'SORT_POSTS', id} as const),
    setTotalPosts: (count: number) => ({type: 'SET_POSTS_COUNT', count} as const),
    setActivePostPage: (page: number) => ({type: 'SET_ACTIVE_POST_PAGE', page} as const),
    addPosts: (posts: PostType[]) => ({type: 'ADD_POSTS', payload:posts} as const),
    addSearchFilter: (filter: string | null) => ({type: 'ADD_POST_SEARCH_FILTER', filter} as const),
}



export default postsReducer