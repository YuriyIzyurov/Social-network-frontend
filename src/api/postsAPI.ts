import {instanceBlog} from "./api"
import {AddPostType, UserType} from "typings/types";

//todo: написать типы респонсов


export const postsAPI = {
    getPosts(page:number = 1, limit:number = 3) {
        return instanceBlog.get(`posts?page=${page}&limit=${limit}`).then(response => response.data)
    },
    writePost(post: AddPostType) {
      return instanceBlog.post(`posts`, post).then(response => response.data)
    },
    uploadPreview(file: File) {
        const formData = new FormData()
        formData.append("preview", file)
      return instanceBlog.post(`upload`, formData).then(response => response.data)
    },
    getPostById(id:string | undefined) {
        return instanceBlog.get(`posts/${id}`).then(response => response.data)
    },
    updatePost(post: AddPostType, id:string) {
        return instanceBlog.patch(`posts/${id}`, post).then(response => response.data)
    },
    deletePost(id:string) {
        return instanceBlog.delete(`posts/${id}`).then(response => response.data)
    }
}
export  const commentsAPI = {
    writeComment(id:string, text:string){
        return instanceBlog.post(`comments/${id}`, {text}).then(response => response.data)
    },
    getAllCommentsOfPost(id:string | undefined){
        return instanceBlog.get(`comments/${id}`).then(response => response.data)
    },
    deleteComment(id:string) {
        return instanceBlog.delete(`comments/${id}`).then(response => response.data)
    },
    updateComment(text: string, id:string) {
        return instanceBlog.patch(`comments/${id}`, {text}).then(response => response.data)
    }
}
export const authBlogAPI = {
    submitAuth(email: string, password: string) {
        return instanceBlog.post('login', {email, password}).then(response => response.data)
    },
    getMe() {
      return instanceBlog.get('auth/me').then(response => response.data)
    },
    uploadAvatar(file: File) {
        const formData = new FormData()
        formData.append("avatar", file)
        return  instanceBlog.post('user/avatar',formData).then(response => response.data)
    }
}
/*
type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(activePage: number, usersOnPage: number, term: string = '', friend: null|boolean = null) {
        return instanceSocial.get<GetItemsType<UserType>>(`users?page=${activePage}&count=${usersOnPage}&term=${term}` + (friend === null ? '':`&friend=${friend}`)).then(response => response.data)
    },
    followUser(id: number) {
        return instanceSocial.post<ResponseAPIType>(`follow/${id}`, {}).then(response => response.data)
    },
    unFollowUser(id: number) {
        return instanceSocial.delete<ResponseAPIType>(`follow/${id}`).then(response => response.data)
    },
    getFriends(usersOnPage: number) {
        return instanceSocial.get<GetItemsType<UserType>>(`users?count=${usersOnPage}&friend=${true}`).then(response => response.data)
    }
}*/
