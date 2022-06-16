import {instance, ResponseAPIType } from "./api"
import {UserType} from "../typings/types";
import {FilterType} from "../redux/usersReducer";

type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(activePage: number, usersOnPage: number, term: string = '', friend: null|boolean = null) {
        return instance.get<GetItemsType<UserType>>(`users?page=${activePage}&count=${usersOnPage}&term=${term}` + (friend === null ? '':`&friend=${friend}`)).then(response => response.data)
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