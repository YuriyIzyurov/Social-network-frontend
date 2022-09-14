import {instanceSocial, ResponseAPIType } from "./api"
import {GetItemsType, UserType} from "typings";


export const usersAPI = {
    getUsers(activePage: number, usersOnPage: number, term: string = '', friend: null|boolean = null) {
        return instanceSocial.get<GetItemsType<UserType>>(`users?page=${activePage}&count=${usersOnPage}&term=${term}` + (friend === null ? '':`&friend=${friend}`))
            .then(response => response.data)
    },
    getSidebarUsers() {
        return instanceSocial.get<GetItemsType<UserType>>(`users?friend=true&count=100`).then(response => response.data)
    },
    followUser(id: number) {
        return instanceSocial.post<ResponseAPIType>(`follow/${id}`, {}).then(response => response.data)
    },
    unFollowUser(id: number) {
        return instanceSocial.delete<ResponseAPIType>(`follow/${id}`).then(response => response.data)
    },
}