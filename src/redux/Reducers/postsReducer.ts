import {AddPostType, PostType} from "typings";
import {BaseThunkType, InferActionsTypes} from "redux/reduxStore";
import {postsAPI} from "api/postsAPI";
import {postActions} from "redux/Actions";

export type ThunkPostType = BaseThunkType<ActionType>
type ActionType = InferActionsTypes<typeof postActions>
type initialPostStateType = typeof initialState

let initialState = {
    posts: [] as Array<PostType>,
    isFetching: false as boolean | false,
    id: null as string | null,
    totalCount: null as number | null,
    activePage: 1,
    postsOnPage: 5,
    searchFilter: null as string | null,
    myPosts: [] as Array<PostType>,
    countOfMyPosts: null as number | null,
    isAuthorTabPicked: false as boolean | false,
    isMyTabPicked: false as boolean | false,
    currentAuthorID: null as string | null,
    isScrollTop: false as boolean | false
}

export const postsReducer = (state = initialState, action: ActionType ):initialPostStateType => {
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
        case 'LOAD_POSTS':
            return {
                ...state,
                myPosts: action.payload.posts,
                countOfMyPosts: action.payload.count
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
        case "PICK_AUTHOR_POSTS_TAB":{
            return {
                ...state,
                isAuthorTabPicked: action.status
            }
        }
        case "PICK_MY_POSTS_TAB":{
            return {
                ...state,
                isMyTabPicked: action.status
            }
        }
        case 'SET_CURRENT_AUTHOR_ID': {
            return {
                ...state,
                currentAuthorID: action.id
            }
        }
        case 'DELETE_CURRENT_AUTHOR_ID': {
            return {
                ...state,
                currentAuthorID: null
            }
        }
        case 'SET_SCROLL_TO_TOP':{
            return {
                ...state,
                isScrollTop: action.isScrollTop
            }
        }
        default:
            return state
    }
}
export const handlingGetAllPosts = (searchFilter:string|null = null, viewed:boolean = false):ThunkPostType => {
    return async (dispatch) => {
        dispatch(postActions.setActivePostPage(1))
        dispatch(postActions.setFetching(true))
        const response = await postsAPI.getPosts(searchFilter,viewed)
        dispatch(postActions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(postActions.setAllPosts(response.data.posts))
            dispatch(postActions.setTotalPosts(response.data.totalCount))
        } else {
            console.log('Smthng go wrong')
        }
    }
}
export const handlingAddPosts = (page:number, limit:number, searchFilter:string|null = null, viewed:boolean = false):ThunkPostType => {
    return async (dispatch) => {
        dispatch(postActions.setActivePostPage(page))
        dispatch(postActions.setFetching(true))
        const response = await postsAPI.getPosts(searchFilter,viewed, page, limit)
        dispatch(postActions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(postActions.addPosts(response.data.posts))
        } else {
            console.log('Smthng go wrong')
        }
    }
}
export const publicPost = (post: AddPostType, id: string | null = null):ThunkPostType => {
    return async (dispatch) => {
        dispatch(postActions.setFetching(true))
        if(id) {
            const response = await postsAPI.updatePost(post, id)
            if(response.resultCode === 0) {
                dispatch(postActions.setCreatedPostId(response.data._id))
            } else console.log(response)
        } else {
            const response = await postsAPI.writePost(post)
            if(response.resultCode === 0) {
                dispatch(postActions.setCreatedPostId(response.data._id))
            }
        }
        dispatch(postActions.setFetching(false))

    }
}
export const deletePublication = (id:string):ThunkPostType => {
    return async (dispatch) => {
        dispatch(postActions.setFetching(true))
        const response = await postsAPI.deletePost(id)
        dispatch(postActions.setFetching(false))
        if(response.resultCode === 0) {
            dispatch(postActions.deletePostFromState(id))
        } else if(response.resultCode === 1) {
                alert("Статья не найдена")
            } else console.log("Проверь респонс, допиши бэк")
    }
}
export const handlingSetAllPosts = (item:string):ThunkPostType => {
    return async (dispatch) => {
        dispatch(postActions.setFetching(true))
        const response = await postsAPI.getTagMatch(item)
        dispatch(postActions.setFetching(false))
        dispatch(postActions.setTotalPosts(response.data.length))
        dispatch(postActions.setAllPosts(response.data))
        dispatch(postActions.setScrollToTop(true))
    }
}



