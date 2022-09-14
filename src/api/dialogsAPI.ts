import {instanceSocial, ResponseAPIType } from "./api"
import {AllMessageType, DialogType, GetItemsType, PrivateMessageDataType} from "typings";


export const dialogsAPI = {
    startChatting(id: number) {
        return instanceSocial.put<ResponseAPIType>(`dialogs/${id}`, {}).then(response => response.data)
    },
    getAllDialogs() {
        return instanceSocial.get<DialogType[]>(`dialogs`).then(response => response.data)
    },
    getNewMessages() {
        return instanceSocial.get(`dialogs/messages/new/count`).then(response => response.data)
    },
    getFriendMessagesList(id: number, activePage: number, messagesOnPage: number) {
        return instanceSocial.get<GetItemsType<AllMessageType>>(`dialogs/${id}/messages?page=${activePage}&count=${messagesOnPage}`).then(response => response.data)
    },
    sendMessageToFriend(id: number|null, body: string) {
        return instanceSocial.post<ResponseAPIType<PrivateMessageDataType>>(`dialogs/${id}/messages`, {body}).then(response => response.data)
    },
    markMessageAsSpam(messageId: string) {
        return instanceSocial.post<ResponseAPIType>(`dialogs/messages/${messageId}/spam`).then(response => response.data)
    },
    deleteMessage(messageId: string) {
        return instanceSocial.delete<ResponseAPIType>(`dialogs/messages/${messageId}`).then(response => response.data)
    },
    restoreDeletedMessage(messageId: string) {
        return instanceSocial.put<ResponseAPIType>(`dialogs/messages/${messageId}/restore`).then(response => response.data)
    },
}