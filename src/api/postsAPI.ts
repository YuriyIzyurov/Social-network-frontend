import {instanceBlog} from "./api"
import {UserType} from "../typings/types";
//todo: написать типы респонсов


export const postsAPI = {
    getPosts() {
        return instanceBlog.get(`posts`).then(response => response.data)
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
