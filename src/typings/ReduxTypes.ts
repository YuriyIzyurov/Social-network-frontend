export type StatusType = 'pending' | 'ready' | 'error'
export type FriendFilterType = {
    term: string
    friend: boolean
}
export type SpamDataType = {
    messageId:string
    message:string
}
export type FilterType = {
    term: string
    friend:  boolean|null
}