import {instanceSocial, ResponseAPIType } from "./api"
import {PrivateMessageDataType, UserType} from "../typings/types";
import {FilterType} from "../redux/usersReducer";

type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}
export const dialogsAPI = {
    startChatting(id: number) {
        return instanceSocial.put<ResponseAPIType<null>>(`dialogs/${id}`, {}).then(response => response.data)
    },
    getAllDialogs() {
        return instanceSocial.get<any>(`dialogs`).then(response => response.data)
    },
    getFriendMessagesList(id: number, activePage: number, messagesOnPage: number) {
        return instanceSocial.get<any>(`dialogs/${id}/messages?page=${activePage}&count=${messagesOnPage}`).then(response => response.data)
    },
    sendMessageToFriend(id: number, body: string) {
        return instanceSocial.post<ResponseAPIType<PrivateMessageDataType>>(`dialogs/${id}/messages`, {body}).then(response => response.data)
    },

}