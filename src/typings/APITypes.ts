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
export type uploadImagesType =  {
    originalname: string,
    original: FileType
    medium: FileType
    small: FileType
}
export type FileType = {
    filename: string,
    path: string
}