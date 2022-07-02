import {ChatMessageType} from "../pages/Chat/ChatPage";

type SubscriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null
const closeHandler = () => {
    setTimeout(CreateChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}
function CreateChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start(){
        CreateChannel()
    },
    stop(){
        subscribers = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType){
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string)  {
        ws?.send(message)
    }
}