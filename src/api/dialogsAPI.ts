import {instance, ResponseAPIType } from "./api"
import {PrivateMessageDataType, UserType} from "../typings/types";
import {FilterType} from "../redux/usersReducer";

type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export const dialogsAPI = {
    startChatting(id: number) {
        return instance.put<ResponseAPIType<null>>(`dialogs/${id}`, {}).then(response => response.data)
    },
    getAllDialogs() {
        return instance.get<any>(`dialogs`).then(response => response.data)
    },
    getFriendMessagesList(id: number, activePage: number, usersOnPage: number) {
        return instance.get<any>(`dialogs/${id}/messages?page=${activePage}&count=${usersOnPage}`).then(response => response.data)
    },
    sendMessageToFriend(id: number, body: string) {
        return instance.post<ResponseAPIType<PrivateMessageDataType>>(`dialogs/${id}/messages`, {body}).then(response => response.data)
    },

}