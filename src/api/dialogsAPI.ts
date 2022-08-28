import {instanceSocial, ResponseAPIType } from "./api"
import {AllMessageType, DialogType, PrivateMessageDataType, UserType} from "../typings/types";
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
    deleteChatting(id: number) {
        return instanceSocial.delete<ResponseAPIType<null>>(`dialogs/${id}`, {}).then(response => response.data)
    },
    getAllDialogs() {
        return instanceSocial.get<DialogType[]>(`dialogs`).then(response => response.data)
    },
    getFriendMessagesList(id: number, activePage: number, messagesOnPage: number) {
        return instanceSocial.get<GetItemsType<AllMessageType>>(`dialogs/${id}/messages?page=${activePage}&count=${messagesOnPage}`).then(response => response.data)
    },
    sendMessageToFriend(id: number|null, body: string) {
        return instanceSocial.post<ResponseAPIType<PrivateMessageDataType>>(`dialogs/${id}/messages`, {body}).then(response => response.data)
    },
    markMessageAsSpam(messageId: string) {
        return instanceSocial.post(`dialogs/messages/${messageId}/spam`).then(response => response.data)
    },
    deleteMessage(messageId: string) {
        return instanceSocial.delete(`dialogs/messages/${messageId}`).then(response => response.data)
    },
    restoreDeletedMessage(messageId: string) {
        return instanceSocial.put(`dialogs/messages/${messageId}/restore`).then(response => response.data)
    },
//<ResponseAPIType<DialogType>>
}