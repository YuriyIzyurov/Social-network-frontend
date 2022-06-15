import {instance, ResponseAPIType } from "./api"
import {UserType} from "../typings/types";

type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(activePage: number, usersOnPage: number) {
        return instance.get<GetItemsType<UserType>>(`users?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<ResponseAPIType>(`follow/${id}`, {}).then(response => response.data)
    },
    unFollowUser(id: number) {
        return instance.delete<ResponseAPIType>(`follow/${id}`).then(response => response.data)
    },
    getFriends(usersOnPage: number) {
        return instance.get<GetItemsType<UserType>>(`users?count=${usersOnPage}&friend=${true}`).then(response => response.data)
    }
}