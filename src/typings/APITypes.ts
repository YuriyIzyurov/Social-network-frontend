export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string | null
}